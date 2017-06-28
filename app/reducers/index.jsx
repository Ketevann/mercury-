import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  plaid: require('./plaid').default
})

export default rootReducer
