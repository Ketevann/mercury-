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
import DisplayBudget from './DisplayBudget'


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
    this.submitTransactionDate = this.submitTransactionDate.bind(this)
    this.ArrayforChart=this.ArrayforChart.bind(this)
    this.objectForChart= this.objectForChart.bind(this)
  }

  submitTransactionDate(evt) {
    evt.preventDefault()
    const dates = {
      startDate: evt.target.startDate.value,
      endDate: evt.target.endDate.value
    }

    this.props.fetchTransactions(dates.startDate, dates.endDate)

  }

  ArrayforChart(expenseCategory, plaidArr, expensesSum){
    var plaid = []
    Object.keys(expenseCategory).map(key => {
      if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id'){
        if(Number(expenseCategory[key])>0)
          expensesSum += Number(expenseCategory[key])
        plaid.push({ x: key, y: expenseCategory[key] })
      }
    })
 return  plaid
}

  objectForChart(transaction, expenseCategory) {
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


  render() {
    const {budget, modal, modalShow, plaid} = this.props
     let transactions = this.props.transactions.transactions, budgetsum = 0, val

  {/*if the user is not logged in return null*/}
    if (!this.props.user) return null

     {/*declaring variables */}

    let budgetArr = [], plaidArr = [], transacArr = [], expensesSum= 0, found = false,

      expenseCategory = {
        food: 0,
        bills: 0,
        healthcare: 0,
        transportation: 0,
        education: 0,
        emergencies: 0,
        entertainment: 0,
        other:0
      }

    if (transactions !== undefined){

let transactionObject = this.objectForChart(transactions, expenseCategory)
transacArr = this.ArrayforChart(transactionObject, [], 0)

}
if (budget.budget)
  plaidArr = this.ArrayforChart(budget.budget, [], 0)
    return (
      <div>
      <div className="form-container calendar">
        <h2>Select transaction dates:</h2>
        <form className="pure-form" onSubmit={(evt) => this.submitTransactionDate(evt)}>
          <label for="startDate">Start Date:  </label>
          <input className="pure-input-rounded" name="startDate" type="date" />
          <br />
          <label for="endDate">End Date:  </label>
          <input className="pure-input-rounded" name="endDate" type="date" />
          <br />
          <button className="pure-button" type="submit" className="btn">Submit</button>
          </form>
      </div>
      <DisplayBudget budget={budget.budget} plaidArr={plaidArr} transacArr={transacArr} transactions={transactions} expenseCategory={expenseCategory}/>
      </div>
 )
}
}





export default connect(
  ({ modal, auth, budget, plaid }) => ({ modal: modal, transactions: plaid.transactions, user: auth, budget, plaid,
 }),
  { modalShow, logout, fetchTransactions },
)(Expenses)





