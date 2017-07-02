import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const PLAID_PUBLIC_KEY = require('../../newCredentials.js').PLAID_PUBLIC_KEY

import { connectPlaid, fetchAccounts, fetchTransactions, fetchItems } from '../reducers/plaid'

class LinkAccounts extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            plaidData: [],
        }
    }
    render() {
        return (
            <div className="linkedaccounts">

                <button className="transbutton btn" onClick={this.props.connectPlaid}>Open Plaid</button>
                <button className="transbutton btn" onClick={this.props.fetchAccounts}>Get Accounts</button>
                <button className="transbutton btn" onClick={this.props.fetchTransactions}>Get Transactions</button>
                <button className="transbutton btn" onClick={this.props.fetchItems}>Get Items</button>
                {this.state.plaidData.map(({ institution }) => <div>{institution.name} - {institution.type}</div>)}
            </div>
        )
    }
}

export default connect(
    state => ({}), { connectPlaid, fetchAccounts, fetchItems, fetchTransactions })(LinkAccounts)
