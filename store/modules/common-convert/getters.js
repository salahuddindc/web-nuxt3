export default {
  setValidation(state) {
    const validation = {
      rules: {
        from: [
          {
            required: true,
            message: 'Amount is less than the minimum amount ()',
          },
        ],
        to: [
          {
            required: true,
            message: 'Amount is less than the minimum amount ()',
          },
        ],
      },
    }

    return validation
  },
  faqsItem(state) {
    const data = [
      {
        title: '1. Are there any trading fees?',
        desc: 'There are no fees for using Bitnasdaq Convert. In Market mode, live prices are quoted based on current market conditions. The quoted amount of assets shown is the actual amount of assets you will receive in your account once the conversion is executed.In Limit mode, once your order is executed at the specified limit price, the assets will be converted exactly at the specified limit price.',
      },
      {
        title:
          '2. What are the benefits of using Bitnasdaq Convert and how do I get started using the platform?',
        desc: 'There are no fees for using Bitnasdaq Convert.In Market mode, live prices are quoted based on current market conditions. The quoted amount of assets shown is the actual amount of assets you will receive in your account once the conversion is executed.In Limit mode, once your order is executed at the specified limit price, the assets will be converted exactly at the specified limit price.',
      },
      {
        title: '3. What are the requirements to use the portal?',
        desc: 'There are no fees for using Bitnasdaq Convert.In Market mode, live prices are quoted based on current market conditions. The quoted amount of assets shown is the actual amount of assets you will receive in your account once the conversion is executed.In Limit mode, once your order is executed at the specified limit price, the assets will be converted exactly at the specified limit price.',
      },
      {
        title: '4. What are the minimum and maximum trade amounts?',
        desc: 'There are no fees for using Bitnasdaq Convert.In Market mode, live prices are quoted based on current market conditions. The quoted amount of assets shown is the actual amount of assets you will receive in your account once the conversion is executed.In Limit mode, once your order is executed at the specified limit price, the assets will be converted exactly at the specified limit price.',
      },
    ]
    return data
  },
  isSuccessModalVisible(state) {
    return state.isSuccessModalVisible
  },
}
