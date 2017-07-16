import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {modalShow, modalHide, Login, Signup, forgot, newPassowrd} from '../reducers/modal'
import {connect} from 'react-redux'
import {login, signup} from 'APP/app/reducers/auth'


import store from '../store'


class View extends React.Component {

  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClick = () => store.dispatch(modalShow())
  handleClose = () => store.dispatch(modalHide())

  handleSubmit(evt){
    evt.preventDefault()
    let credentials = {email: evt.target.email.value, password: evt.target.password.value}
    this.props.newPassowrd(credentials)
    this.handleClose()
  }
  render() {
    return (
      <div onClick={this.handleClick}>{
        this.props.modal.showModal ?
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog className="dialog"onClose={this.handleClose}>
            <div className="clear"></div>
            <br></br>
            <h3> <a href="#" onClick={()=> this.props.Login() } className="alignleft">Login</a></h3>
            <h5> <a onClick={() => store.dispatch(this.props.Signup()) }className="alignright">Sign up</a></h5>
            <br></br>
            {this.props.modal.login === true ?
              <div>
                <br></br>
                <form onSubmit={evt => {
                  evt.preventDefault()
                  this.props.login(evt.target.email.value, evt.target.password.value)
                  this.handleClose()
                }
               }>
                  <input name="email" placeholder="Email" required />
                  <input name="password" type="password" placeholder="Password" required />
                  <input type="submit" value="Login" />
                 </form>
                <h5> <a href="#" onClick={()=> this.props.forgot() }>Forgot Password?</a></h5>
                  {this.props.modal.forgotPassword?
                    <form onSubmit={(evt) => this.handleSubmit(evt)}>
                     <input name="email" placeholder="Email" required />
                     <input name="password" type="password" placeholder="New Password" required />
                      <input type="submit" value="Change Password" />
                    </form>:null }
              </div> :
              <div>
                <br></br>
                <br></br>
                  <form onSubmit={evt => {
                     evt.preventDefault()
                  this.props.signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
                   }
                  }>
                    <input name="name" placeholder="Name"required />
                    <input name="email" placeholder="Email" required />
                   <input name="password" type="password" placeholder="Password" required />
                    <input type="submit" value="Login" />
                  </form></div> }
                <br></br>
                 <a href="/auth/login/google"> <button className="google"></button> </a>
          </ModalDialog>
        </ModalContainer>
                : null}
      </div>)
  }
}


export default connect(
   ({ modal }) => ({ modal: modal }),
  {modalShow, modalHide, login, signup, Login, Signup, forgot, newPassowrd},
)(View)



