import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import {connect} from 'react-redux'
import {modalShow} from "../reducers/modal"
import store from '../store'
import {logout} from 'APP/app/reducers/auth'




class Expenses extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let budgeting = {}
    console.log("props in expenses", this.props)
    return(
      <div>
        <h1> Budget </h1>
      </div>
      )
    }

}

export default connect(
   ({ modal, auth, budget }) => ({ modal: modal, user: auth, budget: budget }),
  {modalShow, logout},
)(Expenses)
