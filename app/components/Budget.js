import {connect} from 'react-redux'
import React, { Component } from 'react'
import BudgetForm from './BudgetForm'


class Budget extends Component {
  constructor(props){
    super()
  }
  render(){
    return <BudgetForm />
  }
}


export default connect(
   ({ modal, auth }) => ({ modal: modal, user: auth }),
  null,
)(Budget)
