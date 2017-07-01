import axios from 'axios'

const initialState = {budget: null}

const CREATEBUDGET = 'CREATEBUDGET'
const GETGIF = 'GETGIF'


const create = (budget) => {
  console.log("3434343")

  return {type: CREATEBUDGET, budget} }
const sendGif = (data) => ({type: GETGIF, data})




const budgetReducer = (budget=initialState, action) => {
  console.log("in budget", action)
  //var newmodal = Object.assign({},modal);
  switch (action.type) {
  case CREATEBUDGET:
  console.log('budgwew4rwrwrwrwet', action.budget)
    return Object.assign({}, budget, {budget: action.budget})


  case GETGIF:
  console.log(action, "#$#lololo$#", budget, action.data)
    return Object.assign({}, budget, {budget: action.data})
  }


  return budget
}


export const budgetCreate = (credentials) =>
  dispatch =>
  axios.post('/api/budget', credentials)
    .then((res) => dispatch(create(res.data)))
    .catch(console.error())



export const send = () =>
  dispatch =>
  axios.post('/api/nodemailer')
    .then((res) => (console.log("aaaadid a thing!!!!", res.data)))
    .catch(console.error())

export const sendGiff = () =>
  dispatch =>
  axios.get('/api/nodemailer/search')
    .then((res) => dispatch(sendGif(res.data)))
    .catch(console.error())


export const userExpenses = () =>
  dispatch =>
    axios.get('api/budget')
    .then((res) => dispatch(create(res.data)))
    .catch(console.error())

export default budgetReducer

