import axios from 'axios'

const inistialState = {
  showModal: false,
  signUp: false,
  login: true
}

const SHOWMODAL = 'SHOWMODAL'
const HIDEMODAL = "HIDEMODAL"

const LOGIN = 'LOGIN'
const SIGNUP = 'SIGNUP'

export const modalShow = (modal) =>  ({type: SHOWMODAL, modal})


export const modalHide = () => ({type: HIDEMODAL})
export const Login = () => ({type: LOGIN})
export const Signup = () => ({type: SIGNUP })




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
  }
  console.log(modal, 'modal')
  return modal
}

export default modalReducer
