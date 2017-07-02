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
    {console.log(this.props, 'props in Front')}

    return (<div className="homepage">

      <h2 className="tex header"> SPEND YOUR MONEY WISELY</h2>
      <h4 className="text">Mercury helps you see all your accounts at one place</h4>
      <h4 className="hometext"> understand where your money goes, reduce unwanted spending, and save for future goals</h4>
      <button onClick={() => store.dispatch(this.props.modalShow()) }type="button" className="btn btn-warning">Sign Up</button>
      {this.props.modal.signup ? <View /> :null}

</div>)
  }
}


export default connect(
   ({ modal, auth }) => ({ modal: modal, user: auth }),
  {modalShow, modalHide, Login, Signup, forgot, newPassowrd},
)(Front)

