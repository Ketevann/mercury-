import { connect } from 'react-redux'
import React, { Component } from 'react'
import BudgetForm from './BudgetForm'
import { Link } from "react-router";


class Budget extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div className="budget">
        <div className="expenses-btns">
          <Link to="/addexpenses">
            <div className="budget-button">
              <p className="btnText">EDIT BUDGET</p>
              <div className="btnTwo">
                <p className="btnText2">GO!</p>
              </div>
            </div>
          </Link>
          <span></span>
          <Link to="/myexpenses">
            <div className="budget-button">
              <p className="btnText">MY BUDGET</p>
              <div className="btnTwo">
                <p className="btnText2">GO!</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

    )
  }
}


export default connect(
  ({ modal, auth, budget, plaid }) => ({ modal: modal, user: auth, budget, plaid }),
  null,
)(Budget)
