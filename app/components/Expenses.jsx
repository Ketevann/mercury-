import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import {connect} from 'react-redux'
import {modalShow} from "../reducers/modal"
import store from '../store'
import {logout} from 'APP/app/reducers/auth'
import {PieChart} from 'react-easy-chart';



class Expenses extends Component {
  constructor(){
    super()
  }

  render(){
    {console.log("props in expenses", this.props)}
    return(

null
           )
    }
  }




export default connect(
   ({ modal, auth, budget }) => ({ modal: modal, user: auth, budget: budget }),
  {modalShow, logout},
)(Expenses)
