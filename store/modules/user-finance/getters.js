const getInvestmentPlanSatistics = (state) => {
    return state.investmentPlanSatistics || {}
}

const get3YearsBnqPlan = (state) => {
    return state.threeYearsBnqPlan || {}
}
const getBnqWealthManagementPlan = (state) => {
    return state.bnqWealthManagementPlan || {}
}
const getFinanceProducts = (state) => {
    return state.financeProducts || []
}

export default {
    getInvestmentPlanSatistics,
    get3YearsBnqPlan,
    getBnqWealthManagementPlan,
    getFinanceProducts
}
