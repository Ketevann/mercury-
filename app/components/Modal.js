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
    console.log(evt.target.email.value, evt.target.password.value)
    let credentials = {email: evt.target.email.value, password: evt.target.password.value}
    this.props.newPassowrd(credentials)
    this.handleClose()
  }
  render() {
    {console.log (" modeeelslsl", this.props)}
    return (
      <div onClick={this.handleClick}>{
        this.props.modal.showModal ?
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog className="dialog"onClose={this.handleClose}>
            <div className="clear"></div>
            <br></br>


            <br></br>
            {this.props.modal.login === true ?
              <div>
               <h5> <a onClick={() => store.dispatch(this.props.Signup()) }className="alignright">Sign up</a></h5>
                <span className="alignright" >Not a member? </span>

                <br></br>
                <h2 clssName="clear">Member Login</h2>
                <form onSubmit={evt => {
                  evt.preventDefault()
                  this.props.login(evt.target.email.value, evt.target.password.value)
                  this.handleClose()
                }
               }>
                  <input className="credentials" name="email" placeholder="Email" required />
                  <br></br>
                  <input className="credentials" name="password" type="password" placeholder="Password" required />
                  <br></br>
     
                    <input type="submit" value="Login" />
                </form>
                <h5> <a href="#" onClick={()=> this.props.forgot() }>Forgot Password?</a></h5>
                  {this.props.modal.forgotPassword?
                    <form onSubmit={(evt) => this.handleSubmit(evt)}>
                     <input name="email" placeholder="Email" required />

                     <input name="password" type="password" placeholder="New Password" required />
                      <input  type="submit" value="Change Password" />
                    </form>:null }
              </div> :
              <div>
                 <h5> <a href="#" onClick={()=> this.props.Login() } className="alignright">Login</a></h5>
                 <span className="alignright" >Alredy a member? </span>
                <br></br>
                <br></br>
                  <h2 clssName="clear">Join Mercury</h2>
                  <form onSubmit={evt => {
                     evt.preventDefault()
                    console.log(evt.target.email.value, ' valuee')

                  this.props.signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
                   }
                  }>
                    <input className="credentials" name="name" placeholder="Name"required />
                    <br></br>
                    <input className="credentials" name="email" placeholder="Email" required />
                    <br></br>
                  <input className="credentials" name="password" type="password" placeholder="Password" required />
                  <br></br>
                    <input type="submit" value="Login" />
                  </form></div> }
                <br></br>
                 <a href="/api/auth/login/google"> <button className="google"></button> </a>
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
