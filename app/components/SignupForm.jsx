import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { modalShow, modalHide} from '../reducers/modal'
import { connect } from 'react-redux'
import { login, signup } from 'APP/app/reducers/auth'
import store from '../store'

class SignupForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)


  }
  handleClick = () => store.dispatch(modalShow())
  handleClose = () => store.dispatch(modalHide())
  handleSubmit(evt) {
  evt.preventDefault()
  this.props.signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
  this.handleClose()

  }
  render() {
    return (
      <div>
  <form onSubmit={evt => this.handleSubmit(evt)}>
    <input className="credentials" name="name" placeholder="Name" required />
      <br></br>
      <input className="credentials" name="email" placeholder="Email" required />
      <br></br>
      <input className="credentials" name="password" type="password" placeholder="Password" required />
      <br></br>
        <br></br>
      <input className="btn" type="submit" value="Sign Up" />
    </form>
      </div>)
  }
}
export default connect(
  ({ modal }) => ({ modal: modal }),
  { modalShow, modalHide,  signup },
)(SignupForm)


