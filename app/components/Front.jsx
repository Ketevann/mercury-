import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import store from '../store'
import {modalShow} from '../reducers/modal'
import Modal from './Modal'



class Front extends Component {
  constructor(props){
    super()
  }
  render(){
    return (<div className="homepage">
      <h2 className="tex header "> SPEND YOUR MONEY WISELY</h2>
      <h4  className="text ">Mercury helps you keep track of your budget and spending</h4>
      <h4 className="hometext "> and alerts you when you go off-track</h4>
      <button onClick={() => store.dispatch(this.props.modalShow()) } type="button" className="btn btn-warning signup">Sign Up</button>
      {this.props.modal.signup ? <Modal /> :null}

</div>)
  }
}


export default connect(
   ({ modal, auth }) => ({ modal: modal, user: auth }),
  {modalShow},
)(Front)

