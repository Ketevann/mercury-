import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import {signup } from 'APP/app/reducers/auth'

class SignupForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state= {signedUp: null}
  }

 
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
    this.setState({signedUp: true})
  }
  render() {
    {console.log('props', this.props)}
    return (
      <div>
  <form onSubmit={evt => this.handleSubmit(evt)}>
    <input className="credentials" name="name" placeholder="Name" required />
      <br></br>
      <input className="credentials" name="email" placeholder="Email" required />
      <br></br>
      <input className="credentials" name="password" type="password" placeholder="Password" required />
      <br></br>
        <br></br>
      <input className="btn" type="submit" value="Sign Up" />
    </form>
    {this.state.signedUp === true && this.props.user.auth === ''?
             <div style={{color: 'red'}}>Incorrect Input</div>
             :null}
      </div>)
  }
}

export default connect(
  (user) => ({user}),
  {signup},
)(SignupForm)


