


const setInvestmentPlanSatistics = (state, obj) => {
    state.investmentPlanSatistics = obj
}
const set3YearsBnqPlan = (state, obj) => {
    state.threeYearsBnqPlan = obj
}
const setBnqWealthManagementPlan = (state, obj) => {
    state.bnqWealthManagementPlan = obj
}
const setFinanceProducts = (state, arrayData) => {
    state.financeProducts = arrayData
}

export default {
    setInvestmentPlanSatistics,
    set3YearsBnqPlan,
    setBnqWealthManagementPlan,
    setFinanceProducts
}
