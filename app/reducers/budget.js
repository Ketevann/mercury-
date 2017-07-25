import axios from 'axios'

const initialState = {budget: null}

const CREATEBUDGET = 'CREATEBUDGET'
const GETGIF = 'GETGIF'


const create = (budget) => ({type: CREATEBUDGET, budget})
const sendGif = (data) => ({type: GETGIF, data})




const budgetReducer = (budget=initialState, action) => {

  switch (action.type) {
  case CREATEBUDGET:
    return Object.assign({}, budget, {budget: action.budget})


  case GETGIF:
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

