import axios from 'axios'

const initialState = {budgetUpdates: 'ON', prodUpdates: 'ON', thing: null, amount: null}

const BUDGETUP = 'BUDGETUP'
const PRODUP = 'PRODUP'
const SETPROD = 'SETPROD'

const budgetUp = (status) => ({
  type: BUDGETUP,
  budgetUpdates: status.budgetUpdates
})
const prodUp = (status)=>({
  type: PRODUP,
  prodUpdates: status.prodUpdates
})
const setProd = (status)=>({
  type: SETPROD,
  productInfo: status
})

const emailReducer = (email=initialState, action) => {
  switch (action.type) {
  case BUDGETUP:
    console.log('in first option!!')
    return Object.assign({}, email, {budgetUpdates: action.budgetUpdates})
  case PRODUP:
    return Object.assign({}, email, {prodUpdates: action.prodUpdates})
  case SETPROD:
    return Object.assign({}, email, {thing: action.productInfo.thing, amount: action.productInfo.amount})
  default:
    return Object.assign({}, email)
}
}


export const budgetEmail = (status) =>
  dispatch =>{
    console.log('in DISPATCHER', status)
  return axios.put('/api/budgetEmail', status)
    .then((res) => dispatch(budgetUp(status)))
    .catch(console.error())
  }

export const prodEmail = (status) =>
  dispatch =>{
    console.log('in DISPATCHER', status)
  return axios.put('/api/prodEmail', status)
    .then((res) => dispatch(prodUp(status)))
    .catch(console.error())
  }

export const prodCont = (status) =>
  dispatch =>{
    console.log('in DISPATCHER', status)
  return axios.put('/api/addToUser',status)
    .then((res) => dispatch(setProd(status)))
    .catch(console.error())
  }

export const emailSettings = () =>
  dispatch => {
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        console.log('GOT THE USER', response.data.budgetUpdates)
        dispatch(budgetUp({budgetUpdates: response.data.budgetUpdates}))
        dispatch(prodUp({prodUpdates: response.data.prodUpdates}))
        dispatch(setProd({thing: response.data.thing, amount: response.data.amount}))
      })
      .catch(console.error())
  }




export default emailReducer

