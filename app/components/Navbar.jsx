import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import Modal from './Modal'
import {connect} from 'react-redux'





// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.

const Navbar = ({ handleClick }, props) => {
    {console.log(props, ' we have props')}

    return (

        <nav className="navbar navbar-inverse   navbar-fixed-top topnav " role="navigation">
            <div className="container topnav">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-left">
                        <li><Link id="home" to="/home">Home</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button onClick={() => {some=!some}} >Login</button></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                   <li><a href="/api/auth/login/google"> Log in with google </a></li>
                   </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Sign Up</a></li>
                    </ul>

                </div>

            </div>

        </nav>

    )
}

const mapStateToProps = (modal) => {
  return {modal: modal}
}
export default connect(mapStateToProps, null)(Navbar)
