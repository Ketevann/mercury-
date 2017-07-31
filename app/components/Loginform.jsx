import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { connect } from 'react-redux'
import { login } from 'APP/app/reducers/auth'
import store from '../store'





class LoginForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.login(evt.target.email.value, evt.target.password.value)
    this.handleClose()
  }
  render() {
    return (
      <div>
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <input className="credentials" name="email" placeholder="Email" required />
          <br></br>
          <input className="credentials" name="password" type="password" placeholder="Password" required />
          <br></br>
          <br></br>
          <input className="btn" type="submit" value="Login" />
        </form>
      </div>)
  }
}


export default connect(
  null,
  {login},
)(LoginForm)



