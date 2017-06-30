import React from 'react'
import {connect} from 'react-redux'
import  {login} from 'APP/app/reducers/auth'


const LoginForm = (props) => {
  return (
    <form onSubmit={evt => {
    evt.preventDefault()
    props.login(evt.target.email.value, evt.target.password.value)
    props.handleClose()
  }
}>  <input name="name" placeholder="Name"required />
    <input name="email" placeholder="Email" required />
    <input name="password" type="password" placeholder="Password" required />
    <input type="submit" value="Sign Up" />
  </form>
  )
}


export default connect(
   ({ modal }) => ({ modal: modal }),
  {login},
)(LoginForm)
