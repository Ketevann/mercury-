import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const PLAID_PUBLIC_KEY = require('../../newCredentials.js').PLAID_PUBLIC_KEY

import { connectPlaid, fetchAccounts, fetchTransactions, fetchItems } from '../reducers/plaid'

const Footer = () => {
    return (
      <div className=" footer">
        <br />
        <div id="icons">
          <a href="https://www.facebook.com/MercuryBudget-127818727820690/"><i id="social-fb" className="fa fa-facebook-square fa-3x social" /></a>
          <a href="https://twitter.com/mercurybudget"><i id="social-tw" className="fa fa-twitter-square fa-3x social" /></a>
          <a href="mailto:mercurybudget@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social" /></a></div>
      </div>

    )
  }


export default (Footer)
