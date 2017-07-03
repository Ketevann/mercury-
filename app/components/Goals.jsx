import React from 'react'
import { connect } from 'react-redux'

export default class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {
  //   alert('A goal was added: ' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return (
      <div className="goalsMain">
        <h2>Your Goals</h2>
        <div className="header">
          <form>
            <input placeholder="Enter Goal">
            </input>
            <button type="submit">+</button>
          </form>
        </div>
      </div>
    );
  }
}