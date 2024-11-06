// plugins/socket.client.js

import * as socket from '@microsoft/signalr';
 
import PubSub from 'pubsub-js';

// Constants
const _prohost = 'https://test_push.bitnasdaq.io/hexhub';
const _host = _prohost;
const _sub = 'sub';
const _send = 'send';
const _unsub = 'unsub';
const _receive = 'receive';
const _connect = 'connect';
const _debug = 'debug';

// API Endpoints
const qtdg = 'quotation_trading_details_get';
const qmdg = 'quotation_marketing_depth_get';
const qdg = 'quotation_daily_get';
const qdgall = 'quotation_daily_getall';
const exchangerate = 'exchangerate_get';
const userevent = 'event';
const qkg = 'quotation_kline_get';
const tos = 'trading_order_search';
const ucg = 'usercontract_contract_getindexprice';

 

// Socket class
class _socket {
  constructor() {
    this.single = false;
    this.retry = 0;
    this.console = false;
    this.connection = null;
    this.listened = [];
    this.invokelist = {};
    this.pollinglist = {};
    this.pollingtimer = {};
    this.reinvokelist = [];
    this.receivelist = {};
    this.host = _host;
    this.isConnected = false;
    this.pubsub = PubSub;
    this.tryIsConnected = true;

    // Polling intervals
    this.timer = {
      [qkg]: 3000,
      [qmdg]: 3000,
      [qtdg]: 3000,
      [qdg]: 2000,
      [qdgall]: 5000,
      [exchangerate]: 5000,
      [userevent]: 5000,
      [tos]: 3000,
      [ucg]: 3000,
    };

    this.url = {
      [qkg]: qkg,
      [qmdg]: qmdg,
      [qtdg]: qtdg,
      [qdg]: qdg,
      [qdgall]: qdgall,
      [exchangerate]: exchangerate,
      [userevent]: userevent,
      [tos]: tos,
      [ucg]: ucg,
    };

    this.type = {
      [qkg]: 'kline',
      [qmdg]: 'marketdepth',
      [qtdg]: 'tradedetail',
      [qdg]: 'marketdetail',
      [qdgall]: 'markettickers',
      [exchangerate]: 'exchangerate',
      [userevent]: 'event',
      [ucg]: 'indexprice',
    };
  }

  connect(newconnect) {
    if (!this.is() || this.isConnected) return;

    const createConnection = () => {
      const hubBuilder = new socket.HubConnectionBuilder()
        .withUrl(this.host, {
          transport: socket.HttpTransportType.WebSockets,
          skipNegotiation: true,
        })
        .build();
      hubBuilder.keepAliveIntervalInMilliseconds = 10000;
      return hubBuilder;
    };

    if (newconnect || !this.connection) {
      this.connection = createConnection();
    }
    this.initon();
    this.start();
  }

  start(restart) {
    this.isConnected = false;
    if (restart) {
      this.retry++;
      if (this.retry > 10) {
        this.tryIsConnected = false;
        PubSub.publish(_connect, false);
        this._polling();
        return;
      }
    }
    this.connection
      .start()
      .then(() => {
        this.retry = 0;
        this.isConnected = true;
        PubSub.publish(_connect, true);
        if (restart) {
          this.reinvokelist.forEach(item => item && item());
          Object.values(this.invokelist).forEach(param => this.invoke(param));
        }
      })
      .catch(() => this.start(true));
  }

  initon() {
    this.connection.onclose(() => {
      this.isConnected = false;
      this.start(true);
    });

    this.connection.on(_unsub, data => this.console && console.log(data));
    this.connection.on(_receive, data => {
      try {
        const result = JSON.parse(data);
        const callback = this.receivelist[result.type.toLowerCase()];
        if (callback) callback(result);
        if (this.console) console.log('socket:', result);
      } catch (err) {
        console.error(err);
      }
    });

    this.connection.on(_sub, data => this.console && console.log(JSON.parse(data)));
  }

  is() {
    return !!window.WebSocket;
  }

  listen(method, fun) {
    if (!this.listened.includes(method)) this.listened.push(method);
  }

  receive(type, fun) {
    if (this.is()) this.receivelist[type] = fun;
  }

  invoke(param) {
    if (!this.is()) {
      this._polling(param);
      return;
    }

    this.invokelist[param.type] = param;
    if (this.isConnected) {
      return this.connection.invoke(_sub, param);
    } else {
      return new Promise((resolve, reject) => {
        PubSub.subscribe(_connect, async (_, data) => {
          if (!data) {
            this._uninvoke(param);
            reject(new Error('Socket Connection failed'));
          } else {
            try {
              const response = await this.connection.invoke(_sub, param);
              resolve(response);
            } catch (error) {
              reject(error);
            }
          }
        });
      });
    }
  }

  reinvoke(type, fun) {
    this.reinvokelist.push(fun);
  }

  _polling(item) {
    for (const _item in this.pollinglist) {
      if (item && this.type[_item] === item.type) {
        this.pollinglist[_item].callback();
        break;
      } else if (!item) {
        this.pollinglist[_item].callback();
      }
    }
  }

  polling(item) {
    if (item.url) this.pollinglist[item.url] = item;
    if (!this.tryIsConnected && !this.isConnected) item.callback();
  }

  _unpolling(item) {
    if (item.url in this.pollinglist) {
      this.cleartimer(item.url);
      delete this.pollinglist[item.url];
    }
  }

  uninvoke(list) {
    if (!Array.isArray(list)) list = [list];
    list.forEach(item => {
      if (item && this.invokelist[item.type]) {
        this._uninvoke(this.invokelist[item.type]);
      }
      Object.values(this.pollinglist).forEach(pollItem => {
        if (item && this.type[pollItem.type] === item.type) {
          this._unpolling(pollItem);
        }
      });
    });
  }

  _uninvoke(param) {
    if (this.is() && this.isConnected) {
      delete this.invokelist[param.type];
      delete this.receivelist[param.type];
      param.unsub = param.sub;
      delete param.sub;
      this.connection.invoke(_unsub, param);
      this.connection.invoke(_debug);
    }
  }

  cleartimer(list) {
    if (!Array.isArray(list)) list = [list];
    list.forEach(ti => {
      Object.values(this.pollingtimer[ti]).forEach(timer => {
        clearTimeout(timer);
      });
      this.pollingtimer[ti] = -1;
    });
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const socketInstance = new _socket();

  nuxtApp.vueApp.provide('socket', socketInstance);
  nuxtApp.provide('socket', socketInstance);

  if (process.client) {
    socketInstance.connect();
  }
});
