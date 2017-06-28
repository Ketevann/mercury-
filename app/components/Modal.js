import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {modalShow, modalHide, Login, Signup} from '../reducers/modal'
import {connect} from 'react-redux'
import {login, signup} from 'APP/app/reducers/auth'

import store from '../store'


class View extends React.Component {

  constructor(){
    super()
  }
  handleClick = () => store.dispatch(modalShow())
  handleClose = () => store.dispatch(modalHide())
  render() {
    {console.log (" modeeelslsl", this.props)}
    return <div onClick={this.handleClick}>{
        this.props.modal.showModal  ?
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog className="dialog"onClose={this.handleClose}>
            <div className="clear"></div>
            <br></br>
            {this.props.modal.login === true ?
              <div>
             <h5> <a onClick={()=> this.props.Signup() }className="alignright">Sign up</a></h5>
              <br></br>
            <form onSubmit={evt => {
                      evt.preventDefault()
              this.props.login(evt.target.email.value, evt.target.password.value)
                this.handleClose()
  } }>
    <input name="email" placeholder="Email" required />
    <input name="password" type="password" placeholder="Password" required />
    <input type="submit" value="Login" />
  </form> </div>:

<div>
<h5  className="alignright">Already a Member? </h5>
<h5> <a href="#" onClick={()=> this.props.Login() } className="alignright">Login</a></h5>
 <br></br>
<h3>Join Mercury!</h3>
            <form onSubmit={evt => {
    evt.preventDefault()

    this.props.login(evt.target.email.value, evt.target.password.value)
    this.handleClose()
  } }>
    <input name="name" placeholder="Name"required />
    <br></br>
    <input name="email" placeholder="Email" required />
    <input name="password" type="password" placeholder="Password" required />
    <input type="submit" value="Login" />
  </form></div> }

 <br></br>
  <a href="/api/auth/login/google"> <button className="google"></button> </a>
          </ModalDialog>
        </ModalContainer>
: null}
    </div>
  }
}


export default connect(
   ({ modal }) => ({ modal: modal }),
  {modalShow, modalHide, login, signup, Login, Signup},
)(View)



