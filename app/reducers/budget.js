import axios from 'axios'

const initialState = {budget: null}

const CREATEBUDGET = 'CREATEBUDGET'
const GETBUDGET = 'GETBUDGET'


const create = (budget) => {
  console.log("3434343")

  return {type: CREATEBUDGET, budget} }
//const getUser = (budget) => ({type: GETBUDGET, budget})




const budgetReducer = (budget=initialState, action) => {
  console.log("in budget", action)
  //var newmodal = Object.assign({},modal);
  switch (action.type) {
  case CREATEBUDGET:
  console.log('budgwew4rwrwrwrwet', action.budget)
    return Object.assign({}, budget, {budget: action.budget})


  // case GETBUDGET:
  // console.log(action.budget, "#$#$#", budget)
  //   return Object.assign({}, budget, {budget: action.budget})
  }


  return budget
}


export const budgetCreate = (credentials) =>
  dispatch =>
  axios.post('/api/budget', credentials)
    .then((res) => dispatch(create(res.data)))
    .catch(console.error())





export const userExpenses = () =>
  dispatch =>
    axios.get('api/budget')
    .then((res) => dispatch(create(res.data)))
    .catch(console.error())

export default budgetReducer
