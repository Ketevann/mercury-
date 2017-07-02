import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import {connect} from 'react-redux'
import {modalShow} from "../reducers/modal"
import store from '../store'
import {logout} from 'APP/app/reducers/auth'

//import {PieChart} from 'react-easy-chart';


class Expenses extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let budgeting = {}
    {console.log("props in expenses", this.props)}
    return(
      <div>
{this.props.budget.budget !== null ?

<PieChart
    padding={50}
    labels
    data={[
      { key: 'childcare', value: `${this.props.budget.budget.childcare}`, color: '#aaac84' },
      { key: 'education', value: `${this.props.budget.budget.education}`, color: '#dce7c5' },
      { key: 'Comos', value: 50, color: '#e3a51a' }
    ]}
  />: null } </div>
           )
    }
  }




export default connect(
   ({ modal, auth, budget }) => ({ modal: modal, user: auth, budget: budget }),
  {modalShow, logout},
)(Expenses)
