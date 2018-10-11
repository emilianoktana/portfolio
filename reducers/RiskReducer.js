import { CHANGE_RISK_LEVEL } from '../actions/types'

const initialState = {
    riskLevel: 1
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_RISK_LEVEL:
            return {
                ...state, riskLevel: action.payload
            }
        default:
            return state
    }
}