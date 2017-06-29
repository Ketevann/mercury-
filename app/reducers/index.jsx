import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  modal: require('./modal').default
})

export default rootReducer
