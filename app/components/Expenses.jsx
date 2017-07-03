import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import {connect} from 'react-redux'
import {modalShow} from "../reducers/modal"
import store from '../store'
import {logout} from 'APP/app/reducers/auth'




import {BarChart} from 'react-easy-chart';


class Expenses extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let budgetArr=[]
    let budgeting = {}
    console.log("props in expenses", this.props)
    return(
      <div>
       <h1>budget</h1>
       {this.props.budget.budget?
        Object.keys(this.props.budget.budget).map(key =>{
           budgetArr.push({x: 'A', y: this.props.budget.budget[key] })
        }) : null }
        {console.log(budgetArr)}
     { budgetArr.length ?
       <BarChart
    colorBars
    height={150}
    width={650}
    data={budgetArr}
  /> : null }
      </div>
      )

  }
}

export default connect(
   ({ modal, auth, budget }) => ({ modal: modal, user: auth, budget: budget }),
  {modalShow, logout},
)(Expenses)
