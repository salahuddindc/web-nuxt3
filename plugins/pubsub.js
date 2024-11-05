import * as pubsub from 'pubsub-js';

class PubSubService {
  constructor() {
    this.entrustSaleRate = 2;
    this.entrustBuyRate = 3;
    this.changeCollect = 6;
    this.changeHeaderCollect = 4;
    this.changeHeaderSelfCollect = 10;
    this.changeNewMoney = 5;
    this.getOrderList = 7;
    this.changeDealState = 8;
    this.changeDepthChart = 9;
    this.getTencentImSig = 11;
    this.resetValidate = 12;
    this.addAddress = 13;
    this.checkedKey = 14;
    this.quotationDaily = 17;
    this.indexPrice = 18;
    this.strategiesList = 19;
    this.addedToFavorite = 20;

    // Attach all pubsub methods to this class instance
    Object.assign(this, pubsub);
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const pubsubService = new PubSubService();

  // Provide the service globally
  nuxtApp.provide('pubsub', pubsubService);
});
