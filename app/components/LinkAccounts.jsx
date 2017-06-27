import React, { Component } from 'react'
import { Link } from 'react-router'

const PlaidLink = require('react-plaid-link');
const PLAID_CLIENT_ID = require('../../credentials.js').PLAID_CLIENT_ID
const PLAID_SECRET = require('../../credentials.js').PLAID_SECRET
const PLAID_PUBLIC_KEY = require('../../credentials.js').PLAID_PUBLIC_KEY

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
                <button>Test</button>
                <button onClick={() => this.setState({ open: true })}>Open Plaid</button>
                {
                    this.state.plaidData.map(({ institution }) => <div>{institution.name} - {institution.type}</div>)
                }
                <ReactPlaid
                    clientName="Client Name"
                    product={CONNECT_PRODUCT}
                    key={PLAID_PUBLIC_KEY}
                    env={DEV_ENV}
                    open={this.state.open}
                    onSuccess={(token, metaData) => this.setState({ plaidData: metaData })}
                    onExit={() => this.setState({ open: false })}
                    />
            </div>
        )
    }
}

export default LinkAccounts