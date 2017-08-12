import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { login } from 'APP/app/reducers/auth'





class LoginForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {logged :null}

  }

  handleSubmit(evt) {
    evt.preventDefault()
    return this.props.login(evt.target.email.value, evt.target.password.value)
    this.setState({logged: true})
  
  }
  render() {
{console.log(this.state, this.props, this.props.help, "props ara here", this.props.login.toString())}
    return (
      <div>
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <input className="credentials" name="email" placeholder="Email" required />
          <br></br>
          <input className="credentials" name="password" type="password" placeholder="Password" required />
          <br></br>
          <br></br>
          <input className="btn" type="submit" value="Login" />
        </form>
        {this.state.logged === true && this.props.user.auth === ''?
             <div style={{color: 'red'}}>User Does not Exist</div>
             :null}
      </div>)
  }
}


export default connect(
  (user) => ({user}),
  {login},
)(LoginForm)



