import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import { connect } from 'react-redux'
import { modalShow } from "../reducers/modal"
import store from '../store'
import { logout } from 'APP/app/reducers/auth'
import { connectPlaid } from '../reducers/plaid'



// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    store.dispatch(this.props.modalShow(this.props.modal))
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className=" wrapper container topnav">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul role="full-horizontal" className="nav navbar-nav navbar-left">
              <li><img className="logo " src={'./logo3.png'} /></li>
              <li><Link id="home" to="/home">Home</Link></li>
              {this.props.user ?
                <li><Link id="link" to="/budget">Budget</Link></li> : null}
              {this.props.user ?
                <li><a onClick={this.props.connectPlaid}>Connect to My Account</a></li> : null}
              {this.props.user ?
                <li><Link id="link" to="/emailSettings">Email Settings</Link></li> : null}

            </ul>
            <ul className="nav navbar-nav navbar-right">
              {!this.props.user ?
                <li><Link href="#" onClick={() => this.handleClick()}> Login / Sign Up </Link></li>
                : <div><Link to="" className="logout btn">{this.props.user && this.props.user.name}</Link>
                  <Link type="button" className="logout btn" onClick={this.props.logout}>Logout</Link></div>}
            </ul>
          </div>
        </div>
        {this.props.modal.showModal ? <View /> : null}
      </nav>

    )
  }
}

/*const mapStateToProps = (state) => {
  return {modal: state.modal}
}*/


export default connect(
  ({ modal, auth }) => ({ modal: modal, user: auth }),
  { modalShow, logout, connectPlaid },
)(Navbar)

