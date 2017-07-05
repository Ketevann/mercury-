import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'
import { browserHistory } from "react-router"

import store from '../store'


export default class Goals extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = store.getState()
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleClick = this.handleClick.bind(this)
  // }


  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => {
  //     this.setState(store.getState());
  //   });
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   var newDescription = event.target.description.value;
  //   axios.post(`/api/goals/newgoal`, {  description: newDescription })
  //     .then(res => {
  //       console.log(res.data)
  //       this.state.goals.push(res.data);
  //       this.setState({ goals: this.state.goals })
  //       var element1 = document.querySelector('#description');
  //       element1.value = '';
  //     })

  // }

  // handleClick(event) {
  //   const goalId = event.target.value
  //   axios.delete(`/api/goals/${goalId}`)
  //     .then(res => {
  //       const goals = this.state.goals.filter(goal => {
  //         return goal.id != goalId
  //       })
  //       this.setState({ goals: goals })
  //     })
  // }

  render() {
    return (
      <div className='goalsMain'>
        <div id="myDIV" class="header">
          <h2>My Goals</h2>
        </div>    
          <ul id="myUL">
            <li>Save 20% of my income</li>
            <li className="checked">Pay bills</li>
            <li>Learn what a 401k is</li>
            <li>Pay off my student loans</li>
            <li>Start a vacation fund</li>
          </ul>
          <form id="form" onSubmit={this.handleSubmit}>
            <div className="text"> Add New goal </div>
            <div>
              <label> Description: </label>
              <input name='description' id='description' onChange={this.handleChange} placeholder="Description" />
            </div>
            <button>Submit</button>
          </form>
        </div>
        );
  }
}