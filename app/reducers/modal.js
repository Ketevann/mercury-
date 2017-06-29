import axios from 'axios'
import {whoami} from './auth'
const inistialState = {
  showModal: false,
  signUp: false,
  login: true,
  forgotPassword: false
}

const SHOWMODAL = 'SHOWMODAL'
const HIDEMODAL = "HIDEMODAL"

const LOGIN = 'LOGIN'
const SIGNUP = 'SIGNUP'
const FORGOT = 'FORGOT'


export const modalShow = (modal) =>  ({type: SHOWMODAL, modal})


export const modalHide = () => ({type: HIDEMODAL})
export const Login = () => ({type: LOGIN})
export const Signup = () => ({type: SIGNUP })
export const forgot = () => ({type: FORGOT })





const modalReducer = (modal=inistialState, action) => {
  console.log("herreee")
  //var newmodal = Object.assign({},modal);
  switch (action.type) {
  case SHOWMODAL:

    return Object.assign({}, modal, {showModal: true})

  case HIDEMODAL:

    return Object.assign({}, modal, {showModal: false})


    case LOGIN:

    return Object.assign({}, modal, {login: true, signUp:false})

  case SIGNUP:

    return Object.assign({}, modal, {signUp: true, login: false})

  case FORGOT:

    return Object.assign({}, modal, {forgotPassword: true})
  }
  console.log(modal, 'modal')
  return modal
}

export const newPassowrd = (credentials) =>
dispatch =>
  axios.post('api/auth/password', credentials)
  .then(() => dispatch(forgot()))
  .then(() => dispatch(whoami()))
   .catch(() => dispatch(whoami()))




export default modalReducer
