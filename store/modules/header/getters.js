export default {
  promotionList(state) {
    const price = [
      {
        title: 'VIP plan',
        img: '/images/vip1-header.svg',
        desc: 'Get exclusive discounts on handling fees',
      },
      {
        title: 'Recommend a friend',
        img: '/images/team1.svg',
        desc: 'Recommend friends and share reward',
      },
      {
        title: 'Institution Service',
        img: '/images/merchantaccount.svg',
        desc: 'Enjoy discount on rates investment solution',
      },
      {
        title: 'Agent Plan',
        img: '/images/colaboration.svg',
        desc: 'Refer a friend, double the income',
      },
    ]
    return price
  },
}
