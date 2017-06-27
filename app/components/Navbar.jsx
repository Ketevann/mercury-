import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'

import firebase from 'APP/fire'


// Get the auth API from Firebase.
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export default function Navbar({ handleClick }) {
    return (
        <nav className="navbar navbar-inverse   navbar-fixed-top topnav " role="navigation">
            <div className="container topnav">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-left">
                        {/* WhoAmI takes a firebase auth API and renders either a
          greeting and a logout button, or sign in buttons, depending
          on if anyone's logged in */}
                        <WhoAmI auth={auth} />
                        <li><Link id="home" to="/home">Home</Link></li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}