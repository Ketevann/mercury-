import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import Modal from './Modal'
import { connect } from 'react-redux'
import { modalShow } from "../reducers/modal"
import store from '../store'
import { logout } from 'APP/app/reducers/auth'
import { connectPlaid } from '../reducers/plaid'
import { browserHistory } from 'react-router'
import { menuShow, setMenuToTrue } from "../reducers/dropdown"




// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.clickHandlerLogout = this.clickHandlerLogout.bind(this)
    this.handleClick=this.handleClick.bind(this)

  }

  handleClick = () => this.props.menuShow()
  clickHandlerLogout() {
    //logs out and redirects to home
    this.props.logout()
    browserHistory.push('/')
  }

  render() {
    var disp, displayStyle
    if (this.props.menu.showMenu === true)
      disp = 'inline-block'
    else disp = 'none'
    const divStyle = {
      display: disp
    };

    if (store.getState().browser.is.small === true || store.getState().browser.is.extraSmall === true) displayStyle = 'inline'
    else displayStyle = 'none'

    const iconStyle = {
      display: displayStyle
    };
    if (store.getState().browser.is.small !== true && store.getState().browser.is.extraSmall !== true) divStyle.display = 'block'

    return (
      <div className="container">
        <nav className="navbar navbar-inverse navbar-fixed-top animate">
          <div >
            <div id="menu">
             <ul className="menulist nav navbar-nav">
              <i style={iconStyle} className="menuicon fa fa-bars fa-2x" onClick={() => this.handleClick()} />

                <li><img className="logo menuicon" src={'./logo3.png'} /></li></ul>
            </div>
            {this.props.user ?
              <ul className="menulist nav navbar-nav" style={divStyle}>
                <li><Link className="menuicon" id="home" to="/home">Home</Link></li>
                <li><a className="menuicon" onClick={this.props.connectPlaid}>Connect to My Account</a></li>
                <li><Link className="menuicon" id="link" to="/emailSettings">Email Settings</Link></li>
                 <li><Link className="menuicon" id="link" to="/budget">Budget</Link></li>
                <li className="menuicon"><Link className="menuicon" to="" id="name" >{this.props.user && this.props.user.name}</Link></li>
                <li><Link className="menuicon" type="button" id="logbtn" onClick={() => this.clickHandlerLogout()}>Logout</Link></li>
              </ul>
              : <ul className="menulist nav navbar-nav" style={divStyle}><li><Link className="menuicon" href="#" onClick={() => store.dispatch(this.props.modalShow())}> Login / Sign Up </Link></li></ul>}
          </div>
        </nav>
        {this.props.modal.showModal ? <Modal /> : null}
      </div>
    )
  }
}



export default connect(
  ({ modal, auth, menu, browser }) => ({ modal: modal, user: auth, menu: menu, browser: browser }),
  { modalShow, logout, connectPlaid, menuShow, setMenuToTrue },
)(Navbar)
