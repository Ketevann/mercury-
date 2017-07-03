import {connect} from 'react-redux'
import React, { Component } from 'react'
import BudgetForm from './BudgetForm'
import { Link } from "react-router";


class Budget extends Component {
  constructor(props){
    super()
  }
  render(){
    {console.log("props", this.props)}
    return (<div className="budget">
    <Link to="/addexpenses"><button className="budgetbutton btn">Edit Expenses</button></Link>
    <Link to="/myexpenses"><button className="budgetbutton btn">My Expenses</button></Link>

    </div>)
  }
}


export default connect(
   ({ modal, auth, budget, plaid }) => ({ modal: modal, user: auth, budget, plaid }),
  null,
)(Budget)
