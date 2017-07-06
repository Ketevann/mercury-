import {connect} from 'react-redux'
import React, { Component } from 'react'
import BudgetForm from './BudgetForm'
import { Link } from "react-router";
import {budgetEmail, prodEmail, prodCont, emailAdder, emailRemover} from '../reducers/email'
const axios = require('axios');

class Email extends Component {
  constructor(props){
    super(props)
    this.onBudgetClick = this.onBudgetClick.bind(this)
    this.onProdClick = this.onProdClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onEmailSubmit = this.onEmailSubmit.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onBudgetClick = (evt) =>{
    console.log('in onBudgetClick?')
    var status = {budgetUpdates: evt.target.value}
    this.props.budgetEmail(status)
  }

  onProdClick = (evt) => {
    var status = {prodUpdates: evt.target.value}
    this.props.prodEmail(status)
  }

  onSubmit = (evt) => {
        evt.preventDefault();
        console.log('in!', evt.target.thing.value, evt.target.dollar.value);

        var info = {
            thing: evt.target.thing.value,
            amount: evt.target.dollar.value
        }
        evt.target.thing.value = ''
        evt.target.dollar.value = ''
        this.props.prodCont(info)
    }

  onEmailSubmit = (evt) => {
    evt.preventDefault();
    var info = {
            email: evt.target.email.value
        }
    console.log('in onEmailSubmit')
    evt.target.email.value = ''
    this.props.emailAdder(info)
  }
  onButtonClick = (evt) => {
    this.props.emailRemover({email: evt.target.value})
  }

  render(){
    console.log('PROPS',this.props)

    return (
      <div className="email">
        <h3 >Add Your Friends and Let Them Know about Your Success!</h3>
        <div className="row">
        <div className="col-sm-3">
          <p style={{'margin-bottom':'0px'}}>Enable Budget Updates:</p>
          <p style={{'padding-top':'0px'}}>Enable Specified Purchase Updates:</p>
        </div>
        <div className="col-sm-1">
          <select value={this.props.budgetUpdates} onChange={(evt)=>{
            console.log('knows we clicked?')
            this.onBudgetClick(evt)}}>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
          <select onChange={(evt)=>{this.onProdClick(evt)}} value={this.props.prodUpdates} >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>
        <div className='col-sm-4'>
          <img className="coolemail" src={'https://media.giphy.com/media/aOften89vRbG/giphy.gif'}/>
        </div>
        </div>
        <div>
        <h3>Specified Purchase Details</h3>
                  <form onSubmit={(evt)=>{
                    console.log('in??')
                    this.onSubmit(evt)
                }}>
                  <div className='row'>
                  <div className='col-sm-3'>
                    <p>Purchase Location:</p>
                    <input  type="text" name="thing" placeholder={this.props.thing} />
                    <br></br>
                    <p className="dollar">Dollar Amount per Month:</p>
                     <input type="text" name="dollar" placeholder={this.props.amount} />
                     <br></br>
                     <br></br>
                    <button className="pure-button" type="submit" className="btn">Submit</button>
                  </div>
                  <div className='col-sm-1'>


                  </div>
                  </div>
                </form>
        </div>
          <div>
        <h3>Add Contact Email</h3>
                  <form onSubmit={(evt)=>this.onEmailSubmit(evt)}>
                    <p>Email Address:</p>
                    <input type="text" name="email" />
                    <button className="pure-button" type="submit" className="btn">Submit</button>
                </form>
        </div>
        <h4>   Current Emails</h4>
        <ul style={{'list-style': 'none'}}>
        {
          this.props.emails && this.props.emails[0]!=='' && this.props.emails.map((email)=>{
            console.log('doing this??')
            return(
              <div>
              <li className="emaillist"><button className=" glyphicon glyphicon-remove" value={email} onClick={(evt)=>{this.onButtonClick(evt)}}></button> {email}</li>
              </div>)
          })
        }
        </ul>
      </div>
      )
  }
}


export default connect(
   (state) => {
    console.log('STATE',state)
    return ({budgetUpdates: state.email.budgetUpdates,
            prodUpdates: state.email.prodUpdates,
            thing: state.email.thing,
            amount: state.email.amount,
            emails: state.email.emails})},
  {budgetEmail,prodEmail, prodCont, emailAdder, emailRemover},
)(Email)
