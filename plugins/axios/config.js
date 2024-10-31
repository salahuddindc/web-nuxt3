import http from 'http';
import https from 'https';
import Crypto from "./crypto";

const config = {
    headers: {
        'Authorization': '',
        'Content-Type': 'application/hex',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 1000 * 60,
    data: null,
    withCredentials: false,
    responseType: 'json',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
};

if (import.meta.env.SSR) { // Only include these in server-side rendering
    config.httpAgent = new http.Agent({
        keepAlive: true
    });
    config.httpsAgent = new https.Agent({
        keepAlive: true
    });
}

const baseInfo = {
    'uid': 0,
    'version': '1.0',
    'timestamp': new Date().getTime(),
    'key': '',
    'ip': '127.0.0.1',
    'platform': 'Web',
    'lang': 'en-us',
    'deviceid': 'browser',
    'ranstr': ''
}

const tokeninfo = {
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwIiwic3ViIjoidGVzdCIsImlhdCI6IjE2ODA1NzY1MjkiLCJuYmYiOiIxNjgwNTc2NTI5IiwiZXhwIjo2NDgwNTc2NTI5LCJpc3MiOiJiaXRuYXNkYXEiLCJhdWQiOlsiczJtIiwiczJtIl0sImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InZpc2l0b3IifQ.c5TGGOkHyBHuVm3k3AMLK041F6d_BAuj2GMvFrjHknM',
    'expire': new Date().getTime() - 10000000
}
 
let _ip = ''

export default {
    config,
    getToken(store) {
        let _token = store.state.hex_token.value;
        if (!_token || !_token.token)
            _token = tokeninfo;
        if (_token.expire < new Date().getTime()) {
            if (process.client && tokeninfo.expire > 0) {
                tokeninfo.expire = 0;
                var requestBaseInfo = this.getBaseInfo(store);
                store.dispatch('gettoken', requestBaseInfo).then((data) => {
                    if (data != null && data.data != null && data.data != '') {
                        tokeninfo.token = data.data;
                        tokeninfo.expire = new Date().getTime() + 2 * 3600000
                        _token = tokeninfo
                        store.commit('set_token', _token);
                    }
                });
            }
        }
        store.commit('set_token', _token);
        return _token.token;
    },
    getBaseInfo(store) {
        const info = baseInfo;
        info.uid = store.state.hex_uid.value;
        info.key = store.state.hex_key.value;
        if (!process.server || baseInfo.ip == '127.0.0.1') {
            if (store.state.ip == '') {
                fetch('https://api.ipify.org?format=json').then(x => x.json()).then(({ ip }) => {
                    if (ip) {
                        info.ip = ip;
                        store.commit('set_ip', ip);
                    }
                });
            }
            else {
                info.ip = store.state.ip;
            }
            //info.ip = window.returnCitySN ? window.returnCitySN["cip"] : store.state.ip;
            if (process.client)
                info.deviceid = window.navigator.userAgent.toLowerCase();
        }
        info.lang = store.state.hex_lang.locale;
        info.timestamp = new Date().getTime();
        info.ranstr = this.getUUID();
        return info
    },
    getUserIP(onNewIP) {
        if (_ip) {
            onNewIP(_ip);
        } else {
            const myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            let pc = new myPeerConnection({
                iceServers: []
            }),
                noop = function () {
                },
                localIPs = {},
                ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
                key;

            if (!('createDataChannel' in pc)) {
                onNewIP('');
                return;
            }
            const iterateIP = function (ip) {
                if (!localIPs[ip]) {
                    _ip = ip;
                    onNewIP(ip)
                }
                localIPs[ip] = true;
            };
            //create a bogus data channel
            pc.createDataChannel("");
            // create offer and set local description
            pc.createOffer().then(function (sdp) {
                sdp.sdp.split('\n').forEach(function (line) {
                    if (line.indexOf('candidate') < 0) return;
                    line.match(ipRegex).forEach(iterateIP);
                });
                pc.setLocalDescription(sdp, noop, noop);
            }).catch(function (reason) {
                // An error occurred, so handle the failure to connect
            });
            //listen for candidate events
            pc.onicecandidate = function (ice) {
                if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
                ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
            };
        }
    },
    setHeader(store, config) {
        const tokenobj = store.state.hex_token.value;
        if (tokenobj) {
            var newConfig = tokenobj ? {
                Token: Crypto.md5Token(config.data),
                Authorization: 'Bearer ' + tokenobj.token,
                "Content-Type": "application/hex"
            } : {};
            return {
                headers: Object.assign({}, config.headers, newConfig)
            }
        } else {
            return {
                headers: Object.assign({}, config.headers)
            }
        }
    },
    getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
