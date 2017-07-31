import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {showModal, hideModal} from '../reducers/modal'
import {boolLogin, boolSignUp} from '../reducers/login'

import { connect } from 'react-redux'
import { login, signup } from 'APP/app/reducers/auth'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import store from '../store'


class Modal extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClick = () => this.props.showModal()
  handleClose = () => this.props.hideModal()

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.newPassowrd({ email: evt.target.email.value, password: evt.target.password.value })
    this.handleClose()
  }
  render() {
    return (
      <div className="modal" onClick={this.handleClick}>{
        this.props.modal.showModal ?
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog className="dialog" onClose={this.handleClose}>
              <div className="clear"></div>
              <br></br>
              <br></br>
              {this.props.status.login === true ?
                <div>
                  <h5> <a onClick={() => this.props.boolSignUp()} className="alignright">Sign up</a></h5>
                  <span className="alignright" >Not a member? </span>
                  <br></br>
                  <h2 clssName="clear">Member Login</h2>
                  <LoginForm login={login} />

                </div> :
                <div>
                  <h5> <a href="#" onClick={() => this.props.boolLogin()} className="alignright">Login</a></h5>
                  <span className="alignright" >Already a member? </span>
                  <br></br>
                  <br></br>
                  <h2 clssName="clear">Join Mercury</h2>
                  <SignupForm />
                </div>}
              <br></br>
              <a href="/api/auth/login/google"> <button className="google"></button> </a>
            </ModalDialog>
          </ModalContainer>
          : null}
      </div>)
  }
}


export default connect(
  ({ modal, status }) => ({ modal: modal, status: status }),
  {showModal, hideModal, boolLogin, boolSignUp},
)(Modal)
