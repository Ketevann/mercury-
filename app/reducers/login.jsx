
const LOGIN = 'LOGIN'
const SIGNUP = 'SIGNUP'
const FORGOT = 'FORGOT'

export const Login = () => ({type: LOGIN})
export const Signup = () => ({type: SIGNUP })
export const forgot = () => ({type: FORGOT })



const inistialState = {

  signUp: false,
  login: true,
  forgotPassword: false
}



const modalReducer = (login=inistialState, action) => {

  switch (action.type) {
    case LOGIN:

    return Object.assign({}, modal, {login: true, signUp:false, forgotPassword: false})

  case SIGNUP:

    return Object.assign({}, modal, {signUp: true, login: false})

  case FORGOT:

    return Object.assign({}, modal, {forgotPassword: true})
  }
  return login
}
