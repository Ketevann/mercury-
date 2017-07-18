import axios from 'axios'

const initialState = {budgetUpdates: 'ON', prodUpdates: 'ON', thing: null, amount: null, emails: ['']}

const BUDGETUP = 'BUDGETUP'
const PRODUP = 'PRODUP'
const SETPROD = 'SETPROD'
const ADDEMAIL = 'ADDEMAIL'

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
const addEmail = (emails)=>({
  type:ADDEMAIL,
  emails: emails
})

const emailReducer = (email=initialState, action) => {
  switch (action.type) {
  case BUDGETUP:
    return Object.assign({}, email, {budgetUpdates: action.budgetUpdates})
  case PRODUP:
    return Object.assign({}, email, {prodUpdates: action.prodUpdates})
  case SETPROD:
    return Object.assign({}, email, {thing: action.productInfo.thing, amount: action.productInfo.amount})
  case ADDEMAIL:
    return Object.assign({}, email, {emails: action.emails})
  default:
    return Object.assign({}, email)
}
}


export const budgetEmail = (status) =>
  dispatch =>{
  return axios.put('api/email/budgetEmail', status)
    .then((res) => dispatch(budgetUp(status)))
    .catch(console.error())
  }

export const prodEmail = (status) =>
  dispatch =>{
  return axios.put('api/email/prodEmail', status)
    .then((res) => dispatch(prodUp(status)))
    .catch(console.error())
  }

export const prodCont = (status) =>
  dispatch =>{
  return axios.put('api/email/addToUser',status)
    .then((res) => dispatch(setProd(status)))
    .catch(console.error())
  }

export const emailAdder = (email) =>
  dispatch =>{
  return axios.put('api/email/addEmail',email)
    .then((res) => dispatch(addEmail(res.data.emails)))
    .catch(console.error())
  }

export const emailRemover = (email) =>
  dispatch =>{
  return axios.put('api/email/removeEmail',email)
    .then((res) => dispatch(addEmail(res.data.emails)))
    .catch(console.error())
  }

export const emailSettings = () =>
  dispatch => {
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(budgetUp({budgetUpdates: response.data.budgetUpdates}))
        dispatch(prodUp({prodUpdates: response.data.prodUpdates}))
        dispatch(setProd({thing: response.data.thing, amount: response.data.amount}))
        dispatch(addEmail(response.data.emails))
      })
      .catch(console.error())
  }




export default emailReducer

