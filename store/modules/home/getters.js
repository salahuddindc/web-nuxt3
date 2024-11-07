export default {
  // PAYMENT COLUMN
  estimatedValueColumns(state) {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' },
        width: 180,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: 80,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'high',
        width: 80,
      },
      {
        title: '24H Changes',
        dataIndex: 'charges',
        width: 100,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width: 80,
      },
    ]

    return columns
  },
  // PAYMENT DATA
  estimatedValueData(state) {
    const data = [
      {
        name: 'WING Wing Token',
        amount: '0.000796',
        price: '4568.00 ≈₨1,733',
        charges: '-3.68%',
        action: 'Trade',
      },
      {
        name: 'WING Wing Token',
        amount: '0.000796',
        price: '4568.00 ≈₨1,733',
        charges: '-3.68%',
        action: 'Trade',
      },
      {
        name: 'WING Wing Token',
        amount: '0.000796',
        price: '4568.00 ≈₨1,733',
        charges: '-3.68%',
        action: 'Trade',
      },
    ]
    return data
  },
  transationList(state) {
    const price = [
      {
        title: 'Deposit',
        img: '/images/download-icon.svg',
        img1: '/images/dot.svg',
        date: '2022-10-12 13:35:51',
        subTitle: '+5633 USDT',
        completed: 'Completed',
      },
      {
        title: 'Deposit',
        img: '/images/download-icon.svg',
        img1: '/images/dot.svg',
        date: '2022-10-12 13:35:51',
        subTitle: '+5633 USDT',
        completed: 'Completed',
      },
      {
        title: 'Withdraw',
        img: '/images/up-download-icon.svg',
        img1: '/images/dot.svg',
        date: '2022-10-12 13:35:51',
        subTitle: '+5633 USDT',
        completed: 'Completed',
      },
      {
        title: 'Transfer',
        img: '/images/left-download-icon.svg',
        img1: '/images/dot.svg',
        date: '2022-10-12 13:35:51',
        subTitle: '+5633 USDT',
        completed: 'Completed',
      },
      {
        title: 'Deposit',
        img: '/images/download-icon.svg',
        img1: '/images/dot.svg',
        date: '2022-10-12 13:35:51',
        subTitle: '+5633 USDT',
        completed: 'Completed',
      },
      {
        title: 'Deposit hasn’t arrived?',
        img: '/images/question-mark.svg',
        img1: '',
        date: 'Click here',
        subTitle: '',
        completed: '',
      },
    ]
    return price
  },
  getMoreServices(state) {
    const price = [
      {
        title: 'Deposit',
        img: '/images/learn.svg',
        desc: '2022-10-12 13:35:51',
        img1: '/images/right-icon.svg',
      },
      {
        title: 'Deposit',
        img: '/images/refrel.svg',
        desc: '2022-10-12 13:35:51',
        img1: '',
      },
      {
        title: 'Deposit',
        img: '/images/go-to-p2p.svg',
        desc: '2022-10-12 13:35:51',
        img1: '',
      },
      {
        title: 'Deposit',
        img: '/images/fiance.svg',
        desc: '2022-10-12 13:35:51',
        img1: '',
      },
      {
        title: 'Deposit',
        img: '/images/open-orders.svg',
        desc: '2022-10-12 13:35:51',
        img1: '',
      },
      {
        title: 'Deposit',
        img: '/images/transaction-fees.svg',
        desc: '2022-10-12 13:35:51',
        img1: '',
      },
    ]
    return price
  },
}
