import {connect} from 'react-redux'
import React, { Component } from 'react'
import BudgetForm from './BudgetForm'
import { Link } from "react-router";


class Budget extends Component {
  constructor(props){
    super()
  }
  render(){

    return (<div>
    <Link to="/addexpenses"><h3>Edit Expenses</h3></Link>
    <Link to="/myexpenses"><h3>My Expenses</h3></Link>

    </div>)
  }
}


export default connect(
   ({ modal, auth }) => ({ modal: modal, user: auth }),
  null,
)(Budget)
