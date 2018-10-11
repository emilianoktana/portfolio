import { combineReducers } from 'redux'

import RiskReducer from './RiskReducer'

export default combineReducers({
    riskState: RiskReducer    
})