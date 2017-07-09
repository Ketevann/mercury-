import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
const app = require('APP'), { env } = app
const axios = require('axios')
const PLAID_PUBLIC_KEY = env.PLAID_PUBLIC_KEY

import { connectPlaid, fetchAccounts, fetchTransactions, fetchItems } from '../reducers/plaid'

class LinkAccounts extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            plaidData: [],
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        console.log('in!', evt.target.thing.value, evt.target.dollar.value);

        var info = {
            thing: evt.target.thing.value,
            amount: evt.target.dollar.value
        }
        axios.put('/api/addToUser',info).then((thing)=>{console.log('success!')})
    }

    render() {
        return (
            <div className="linkedaccounts">

                <button className="transbutton btn" onClick={this.props.connectPlaid}>Open Plaid</button>
                <button className="transbutton btn" onClick={this.props.fetchAccounts}>Get Accounts</button>
                <button className="transbutton btn" onClick={this.props.fetchTransactions}>Get Transactions</button>
                <button className="transbutton btn" onClick={this.props.fetchItems}>Get Items</button>
                {this.state.plaidData.map(({ institution }) => <div>{institution.name} - {institution.type}</div>)}
                <form onSubmit={(evt)=>{
                    console.log('in??')
                    this.onSubmit(evt)
                }}>
                    <label>
                    Thing:
                    <input type="text" name="thing" />
                    </label>
                    <label>
                    Dollar Amount:
                    <input type="text" name="dollar" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({}), { connectPlaid, fetchAccounts, fetchItems, fetchTransactions })(LinkAccounts)
