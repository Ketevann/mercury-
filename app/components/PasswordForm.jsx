import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { modalShow, modalHide, Login, Signup, forgot, newPassowrd } from '../reducers/modal'
import {boolPassword } from '../reducers/login'
import { connect } from 'react-redux'
import { login, signup } from 'APP/app/reducers/auth'


import store from '../store'


class PasswordForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClick = () => store.dispatch(modalShow())
  handleClose = () => store.dispatch(modalHide())
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.login(evt.target.email.value, evt.target.password.value)
    this.handleClose()
  }
  render() {
    return (
      <div>
  <h5> <a href="#" onClick={() => this.props.boolPassword()}>Forgot Password?</a></h5>
  {this.props.status.forgotPassword ?
    <form onSubmit={(evt) => this.handleSubmit(evt)}>
      <input name="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="New Password" required />
      <input className="btn" type="submit" value="Change Password" />
    </form> : null}
      </div>)
  }
}


export default connect(({ modal, status }) => ({ modal: modal, status: status }),
  { modalShow, modalHide, boolPassword },
)(PasswordForm)



