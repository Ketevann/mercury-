
const LOGIN = 'LOGIN'
const SIGNUP = 'SIGNUP'

export const Login = () => ({type: LOGIN})
export const Signup = () => ({type: SIGNUP })



const inistialState = {
  signUp: false,
  login: true,
}



const statuslReducer = (status=inistialState, action) => {

  switch (action.type) {
  case LOGIN:

    return Object.assign({}, status, {login: true, signUp: false})

  case SIGNUP:

    return Object.assign({}, status, {signUp: true, login: false})
  }
  return status
}

export const boolSignUp = () =>
  dispatch =>
    dispatch(Signup())


export const boolLogin = () =>
dispatch =>
    dispatch(Login())


export default statuslReducer
