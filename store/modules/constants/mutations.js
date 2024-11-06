

const setTempData = (state, object) => {
    state.tempData = object
}
const setConstants = (state, str) => {
    state.constants = str
}

const setAdjustmentCoefficients = (state, arrayData) => {
    state.adjustmentCoefficients = arrayData
}

export default {
    setTempData,
    setConstants,
    setAdjustmentCoefficients,
}
