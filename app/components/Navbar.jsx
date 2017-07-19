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
import { browserHistory } from 'react-router'



// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.clickHandler = this.clickHandler.bind(this)

  }
  handleClick() {
    store.dispatch(this.props.modalShow(this.props.modal))
  }
  clickHandler(){
    this.props.logout()
    browserHistory.push('/')


  }
  render() {
    return (

      <div>
        <div className="navbar-more-overlay" />
        <nav className="navbar navbar-inverse navbar-fixed-top animate">
          <div className="container navbar-more visible-xs">


          </div>
          <div className="container">
            <div className="navbar-header hidden-xs">
                          <li><img className="logo menu-icon" src={'./logo3.png'} /></li>

            </div>
            <ul className="nav navbar-nav navbar-right mobile-bar">
                        <li><Link className="menu-icon" id="home" to="/home">Home</Link></li>
              {this.props.user ?
                <li><Link className="menu-icon" id="link" to="/budget">Budget</Link></li> : null}
                {this.props.user ?
                <li><a className="menu-icon" onClick={this.props.connectPlaid}>Connect to My Account</a></li> : null}
              {this.props.user ?
                <li><Link className="menu-icon" id="link" to="/emailSettings">Email Settings</Link></li> : null}
                {!this.props.user ?
                <li><Link className="menu-icon" href="#" onClick={() => this.handleClick()}> Login / Sign Up </Link></li>
                : null }
                 {this.props.user ?
                 <li className="menu-icon"><Link className="menu-icon" to="" id="name" >{this.props.user && this.props.user.name}</Link></li> : null}
                  {this.props.user ?
                    <li>
                  <Link className="menu-icon" type="button" id="logbtn"  onClick={()=> this.clickHandler()}>Logout</Link></li> : null}

            </ul>
          </div>
        </nav>
                {this.props.modal.showModal ? <View /> : null}

      </div>

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
