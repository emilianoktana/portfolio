import { CHANGE_RISK_LEVEL } from './types'

export const changeRiskLevel = (riskLevel) => dispatch => {
    dispatch({
        type: CHANGE_RISK_LEVEL,
        payload: riskLevel
    })
}