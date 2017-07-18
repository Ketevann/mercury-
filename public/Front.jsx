import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import store from '../store'
import {modalShow, modalHide, Login, Signup, forgot, newPassowrd} from '../reducers/modal'
import View from './Modal'



class Front extends Component {
  constructor(props){
    super()
  }
  render(){

    return (<div className="homepage">

      <h3 className="text">Stop living paycheck to paycheck and control your life.</h3>
      <button onClick={() => store.dispatch(this.props.modalShow()) }type="button" className="btn btn-warning">Sign Up</button>
      {this.props.modal.signup ? <View /> :null}

</div>)
  }
}


export default connect(
   ({ modal, auth }) => ({ modal: modal, user: auth }),
  {modalShow, modalHide, Login, Signup, forgot, newPassowrd},
)(Front)

