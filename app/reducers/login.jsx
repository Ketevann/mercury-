
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



const statuslReducer = (status=inistialState, action) => {

  switch (action.type) {
  case LOGIN:

    return Object.assign({}, status, {login: true, signUp:false, forgotPassword: false})

  case SIGNUP:

    return Object.assign({}, status, {signUp: true, login: false})

  case FORGOT:

    return Object.assign({}, status, {forgotPassword: true})
  }
  return status
}

export const boolSignUp = () =>
  dispatch =>
    dispatch(Signup())

export const boolLogin = () =>
dispatch =>
    dispatch(Login())

export const boolPassword = () =>
dispatch =>
dispatch(forgot())

export default statuslReducer
