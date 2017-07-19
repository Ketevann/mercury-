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
import { menuShow, menuHide } from "../reducers/dropdown"




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
  handleClick = () => this.props.menuShow()
  handleClose = () => this.props.menuHide()

  clickHandler(){
    this.props.logout()
    browserHistory.push('/')
var disp
if (this.props.menu.menuShow) disp = "block"
else disp = 'none'



  }

  render() {
 var disp
if (this.props.menu.showMenu === true) disp = 'block'
else disp = 'none'
    const divStyle = {
      display: disp, // note the capital 'W' here
   // 'ms' is the only lowercase vendor prefix
};
var opp
if (store.getState().browser.is.small ===true || store.getState().browser.is.extraSmall===true ) opp = 'none'
else opp = 'block'
const divStyle2 = {
      display: opp, // note the capital 'W' here
   // 'ms' is the only lowercase vendor prefix
};
    {console.log(this.props, 'props in modal')}
    return (
      <div>


      <div>

        <div className="navbar-more-overlay" />
        <nav className="navbar navbar-inverse navbar-fixed-top animate">
          <div className="container navbar-more visible-xs">


          </div>
          <div className="container">
            <div className="navbar-header hidden-xs">
                          <li><img className="logo menu-icon" src={'./logo3.png'} /></li>

            </div>
            {console.log($(window).width(), store.getState(),' meeed',store.getState().browser.is.medium, opp, 'oppsss')}
             {store.getState().browser.is.medium ===true ?
             console.log("yay")
 : console.log("nooooo")}
 {store.getState().browser.is.small ===true || store.getState().browser.is.extraSmall===true  ?
  <div className="mobbar">
            <i   className="fa fa-bars fa-2x" onClick={() => this.handleClick()} />
            <ul  style={divStyle} className="nav navbar-nav navbar-right mobile-bar " >

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
            : null}














            <ul style={divStyle2} className="nav navbar-nav navbar-right mobile-bar">

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
      </div>
    )
  }
}

/*const mapStateToProps = (state) => {
  return {modal: state.modal}
}*/


export default connect(
  ({ modal, auth, menu, browser }) => ({ modal: modal, user: auth, menu: menu, browser: browser }),
  { modalShow, logout, connectPlaid, menuShow, menuHide },
)(Navbar)
