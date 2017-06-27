import React from 'react'

export const Login = ({ login, signup, thirdPartyLogin }) => (
<div>
  <form onSubmit={evt => {
    evt.preventDefault()
    console.log(evt.target.email.value, ' valuee')

    login(evt.target.email.value, evt.target.password.value)
  } }>
    <input name="email" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
  <form onSubmit={evt => {
    evt.preventDefault()
    console.log(evt.target.email.value, ' valuee')

    signup(evt.target.email.value, evt.target.password.value)
  } }>
    <input name="name" />
    <input name="email" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
      <br/>
     <a href="/api/auth/login/github"> <button>log in with google</button> </a>
</div>
)

import {login, signup, thirdPartyLogin} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login, signup, thirdPartyLogin},
)(Login)
