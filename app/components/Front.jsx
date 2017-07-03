import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import store from '../store'
import { modalShow, modalHide, Login, Signup, forgot, newPassowrd } from '../reducers/modal'
import View from './Modal'



class Front extends Component {
  constructor(props) {
    super()
  }
  render() {
    { console.log(this.props, 'props in Front') }

    return (<div className="homepage">
      <h1>Mercury</h1>
      <div>
        <h3>Stop living paycheck to paycheck and control your life.</h3>
      </div>
      <button type="button" className="btn btn-secondary"><Link id="about" to="/about">Learn More</Link></button>
      <button onClick={() => store.dispatch(this.props.modalShow())} type="button" className="btn btn-warning">Sign Up</button>
      {this.props.modal.signup ? <View /> : null}

    </div>)
  }
}


export default connect(
  ({ modal, auth }) => ({ modal: modal, user: auth }),
  { modalShow, modalHide, Login, Signup, forgot, newPassowrd },
)(Front)

