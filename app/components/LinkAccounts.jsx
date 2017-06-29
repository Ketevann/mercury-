import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const PlaidLink = require('react-plaid-link');
const PLAID_PUBLIC_KEY = require('../../newCredentials.js').PLAID_PUBLIC_KEY

import { connectPlaid, fetchAccounts, fetchTransactions, fetchItems } from '../reducers/plaid'
import ReactPlaid, { DEV_ENV, PROD_ENV, CONNECT_PRODUCT } from "react-plaid";

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
            <div>
                <button onClick={this.props.connectPlaid}>Open Plaid</button>
                <button onClick={this.props.fetchAccounts}>Get Accounts</button>
                 <button onClick={this.props.fetchTransactions}>Get Transactions</button>
                  <button onClick={this.props.fetchItems}>Get Items</button>
                {this.state.plaidData.map(({ institution }) => <div>{institution.name} - {institution.type}</div>)}
            </div>
        )
    }
}

export default connect(
    state => ({}), {connectPlaid, fetchAccounts, fetchItems, fetchTransactions})(LinkAccounts)