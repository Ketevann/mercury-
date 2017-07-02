import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const PLAID_PUBLIC_KEY = require('../../newCredentials.js').PLAID_PUBLIC_KEY

import { connectPlaid, fetchAccounts, fetchTransactions, fetchItems } from '../reducers/plaid'

class Footer extends Component {
    constructor(props, context) {
        super(props, context)

    }
    render() {
        return (
          <div className="footerholder">
          <div className="footer">
        {/* Social Footer, Colour Matching Icons */}
        {/* Include Font Awesome Stylesheet in Header */}
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossOrigin="anonymous" />
        {/* // */}
        <div className="container">

          <hr />
          <div className="text-center center-block">
            <br />
            <a href="https://www.facebook.com/bootsnipp"><i id="social-fb" className="fa fa-facebook-square fa-3x social" /></a>
            <a href="https://twitter.com/bootsnipp"><i id="social-tw" className="fa fa-twitter-square fa-3x social" /></a>
            <a href="https://plus.google.com/+Bootsnipp-page"><i id="social-gp" className="fa fa-google-plus-square fa-3x social" /></a>
            <a href="mailto:bootsnipp@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social" /></a>
          </div>
          <hr />
        </div>
        <br />
        {/* Social Footer, Single Coloured */}
        {/* Include Font Awesome Stylesheet in Header */}
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
        {/* // */}
        </div>
      </div>
        )
    }
}

export default connect(
    state => ({}), {  })(Footer)
