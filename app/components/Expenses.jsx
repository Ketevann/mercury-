import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import { connect } from 'react-redux'
import { modalShow } from "../reducers/modal"
import store from '../store'
import { logout } from 'APP/app/reducers/auth'
import { fetchTransactions } from '../reducers/plaid'
import Chart from './Chart'
import { BarChart } from 'react-easy-chart';



var categories = {
  bills: ["Bank Fees", "Overdraft", "ATM", "Late Payment", "Fraud Dispute", "Foreign Transaction", "Wire Transfer", "Insufficient Funds", "Cash Advance", "Excess Activity", "Cash Advance", "Interest Earned", "Interest", "Interest Charged", "Credit Card", "Rent", "Payment", "Loan", "Rent"],



  education: ["Education", "Education", "Vocational Schools", "Education", "Tutoring and Educational Services", "Education", "Primary and Secondary Schools", "Education", "Fraternities and Sororities", "Education", "Driving Schools", "Education", "Dance Schools", "Education", "Culinary Lessons and Schools", "Education", "Computer Training", "Education", "Colleges and Universities", "Education", "Art School", "Education", "Adult Education"],

  emergencies: ["Law Enforcement", "Police Stations", "Fire Stations", "Correctional Institutions", "Physicians", "Ear, Nose and Throat", "Physicians", "Dermatologists", "Physicians", "Cardiologists", "Healthcare", "Physicians", "Anesthesiologists"],

  entertainment: ["Bar", "Wine Bar", "Bar", "Sports Bar", "Bar", "Hotel Lounge", "Breweries", "Internet Cafes", "Nightlife", "Nightlife", "Strip Club", "Nightlife", "Night Clubs", "Nightlife", "Karaoke", "Nightlife", "Jazz and Blues Cafe", "Nightlife", "Hookah Lounges", "Nightlife", "Adult Entertainment", "Recreation", "Theatrical Productions", "Symphony and Opera", "Sports Venues", "Social Clubs", "Psychics and Astrologers", "Party Centers", "Music and Show Venues", "Museums", "Movie Theatres", "Fairgrounds and Rodeos", "Entertainment", "Dance Halls and Saloons", "Circuses and Carnivals", "Casinos and Gaming", "Bowling", "Billiards and Pool", "Art Dealers and Galleries", "Arcades and Amusement Parks", "Arts and Entertainment", "Aquarium", "Athletic Fields", "Baseball", "Basketball", "Batting Cages", "Boating", "Campgrounds and RV Parks", "Canoes and Kayaks", "Combat Sports"],


  food: ["Winery", "Food and Drink", "Vegan and Vegetarian", "Food and Drink", "Turkish", "Thai", "Swiss", "Sushi", "Steakhouses", "Spanish", "Seafood", "Scandinavian", "Portuguese", "Pizza", "Moroccan", "Middle Eastern", "Mexican", "Mediterranean", "Latin American", "Korean", "Juice Bar", "Japanese", "Italian", "Indonesian", "Indian", "Ice Cream", "Greek", "German", "Gastropub", "French", "Food Truck", "Fish and Chips", "Filipino", "Fast Food", "Falafel", "Food and Drink", "Restaurants", "Chinese", "Caribbean", "Cajun", "Cafe", "Burrito", "Burgers", "Breakfast Spot", "Brazilian", "Barbecue", "Bakery", "Bagel Shop", "Australian", "Asian", "American", "African", "Afghan"],

  healthcare: ["Psychologists", "Pregnancy and Sexual Health", "Podiatrists", "Physical Therapy", "Optometrists", "Nutritionists", "Nurses", "Mental Health", "Medical Supplies and Labs", "Hospitals, Clinics and Medical Centers", "Emergency Services", "Dentists", "Counseling and Therapy", "Chiropractors", "Blood Banks and Centers", "Alternative Medicine", "Healthcare", "Healthcare Services", "Acupuncture"],

  transportation: ['Taxi', 'Cab', 'Subway', 'Travel', 'Transportation Centers', 'Tolls and Fees', 'Rail', 'Public Transportation Services', 'Parking', 'Car Service', 'Airlines and Aviation Services', 'Airports']
}


class Expenses extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const dates = {
      startDate: evt.target.startDate.value,
      endDate: evt.target.endDate.value
    }
    {/*fetches transactions based on date*/}
    this.props.fetchTransactions(dates.startDate, dates.endDate)
  }

  render() {
    {/*if the user is not logged in return null*/}
    if (!this.props.user) return null
     {/*declaring variables */}
    let budgetArr = [], plaidArr = [], expensesSum= 0, found = false,
      expenseCategory = {
        food: 0,
        biils: 0,
        healthcare: 0,
        transportation: 0,
        education: 0,
        emergencies: 0,
        entertainment: 0,
        other:0
      },
      transactions = this.props.transactions.transactions, budgetsum = 0, val
   {/*creates the budget expenses table if the budget exists*/}
    if (transactions !== undefined){
      plaidArr = another(iterate(transactions, expenseCategory), plaidArr, expensesSum)
      var tot = this.props.barChartTr.reduce((total, val) => {
        return total + val.amount
      }
, 0)}
{console.log(this.props, 'props', plaidArr)}
    return (
    <div className="expense">
      <div className="form-container">
          <h2>Select transaction dates:</h2>
          <form className="pure-form" onSubmit={(evt) => this.handleSubmit(evt)}>
            <label for="startDate">Start Date:  </label>
            <input className="pure-input-rounded" name="startDate" type="date" />
            <br />
            <label for="endDate">End Date:  </label>
            <input className="pure-input-rounded" name="endDate" type="date" />
            <br />
            <button className="pure-button" type="submit" className="btn">Submit</button>
           </form>
        </div>
        <div className="montlybudget">
          <h4> Total Spent</h4>
          {tot && <h5>${tot.toFixed(2)}</h5>}
          <h4> Amount Left </h4>
          {tot && <h5>${(this.props.monthlyBudget - tot).toFixed(2)}</h5>}
          <div className="text">
            <h3>Spending Habits</h3>
          </div>
        </div>
         {/*if the budget exists, creating a an array of objects with x, y coordinates and making a bar chart by sending the data to Chart component as props */}
        {this.props.budget.budget ?
          Object.keys(this.props.budget.budget).map(key => {
            if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
              budgetsum += Number(this.props.budget.budget[key])
              budgetArr.push({ x: key, y: Number(this.props.budget.budget[key]) })
            }
          })
         && <Chart data={budgetArr} />
           : null}
        <h4>Total Budget Expenses: ${budgetsum} </h4>
        <h4>Total Expenses: ${expensesSum.toFixed(2)} </h4>
        {/*if the transactions were fetched aking a bar chart by sending the data to Chart component as props */}
        {plaidArr.length > 0 ?
          <Chart data={plaidArr} /> : null}
         <h3>Budget Expenses</h3>
         {/*creates the budget expenses table if the budget exists*/}
        {this.props.budget.budget ?
          <table className="table table-bordered">
            <thead className="habits" >
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Cost</th>
              </tr>
            </thead>
            {
              Object.keys(this.props.budget.budget).map((key, index) => {
                if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id'){
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{key}</td>
                        <td>{this.props.budget.budget[key]}</td>
                      </tr>
                    </tbody>)
                }
              })
            }
          </table> : null}
          <h3 >  Expenses </h3>
          {/*creates the transactions table if the budget exists*/}
          {transactions ?
          <table className="table table-bordered">
            <thead className="habits" >
              <tr>
                <th>#</th>
                <th>Location</th>
                <th>Type</th>
                <th>Cost</th>
              </tr>
            </thead>
            {
              transactions.map((item, index) => {
                return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    {item.category ? (<td>{item.category[0]}</td>) : (<td>N/A</td>)}
                    <td>{item.amount}</td>
                  </tr>
                </tbody>)
              })
            }
          </table> : null }
        <div>
      </div>
    </div>
    )
  }
}
{/*iterates over real transactions, compares transaction categories to the "categories" object,
initialized above, sums up the total money spent on each category and the total money spent,
puts the data in the array of objects as x and y coordinates and returns the array to be used in as data in the chart*/}
const iterate = (transaction, expenseCategory) => {
 let found = false, val
  transaction.map(obj => {
    if (obj.amount > 0) val = obj.amount
    else val = 0
    Object.keys(categories).map(keys => {
      if (obj.category) {
        if (categories[keys].indexOf(obj.category[0]) !== -1) {
          found = true
          if (expenseCategory[keys] === 0) {
            expenseCategory[keys] = val
          } else expenseCategory[keys] += val
        }
      }
    })
    if (!found) {
      {/*if the transaction category did not match any keys in the categories object, it is placed in other*/}
      expenseCategory['other'] += val
    }
  })
  return expenseCategory
}
function another(expenseCategory, plaidArr, expensesSum){
  Object.keys(expenseCategory).map(key => {
    console.log("iteration")
    if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id'){
    if(Number(expenseCategory[key])>0)
      expensesSum += Number(expenseCategory[key])
      plaidArr.push({ x: key, y: expenseCategory[key] })
    }
})
  return plaidArr
}

const barChart = (items) => {
  var toLoop = items.transactions,
  loopLength = items.total_transactions,
  things = {},
  arr = []
    if (toLoop !== undefined) {
      for (var i = 0; i < loopLength; i++) {
        var name = (toLoop[i].category) ? toLoop[i].category[0] : 'N/A';
        if (toLoop[i].amount > 0 && name !== 'Transfer') {
          things[name] = things[name] || 0
          things[name] += toLoop[i].amount
        }
      }
        for (var val in things) {
          arr.push({ type: val, amount: things[val] })
        }
      return arr
    }
  return 'failed'
}

export default connect(
  ({ modal, auth, budget, plaid }) => ({ modal: modal, transactions: plaid.transactions,user: auth, budget: budget, plaid, barChartTr: barChart(plaid.transactions),
 }),
  { modalShow, logout, fetchTransactions },
)(Expenses)


