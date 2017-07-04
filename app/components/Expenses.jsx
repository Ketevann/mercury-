import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import { connect } from 'react-redux'
import { modalShow } from "../reducers/modal"
import store from '../store'
import { logout } from 'APP/app/reducers/auth'




import { BarChart } from 'react-easy-chart';



var categories = {
  bills: ["Bank Fees", "Overdraft", "ATM", "Late Payment", "Fraud Dispute", "Foreign Transaction", "Wire Transfer", "Insufficient Funds", "Cash Advance", "Excess Activity", "Cash Advance", "Interest Earned", "Interest", "Interest Charged", "Credit Card", "Rent", "Payment", "Loan", "Rent"],



  education: ["Education", "Education", "Vocational Schools", "Education", "Tutoring and Educational Services", "Education", "Primary and Secondary Schools", "Education", "Fraternities and Sororities", "Education", "Driving Schools", "Education", "Dance Schools", "Education", "Culinary Lessons and Schools", "Education", "Computer Training", "Education", "Colleges and Universities", "Education", "Art School", "Education", "Adult Education"],

  emergency: ["Law Enforcement", "Police Stations", "Fire Stations", "Correctional Institutions", "Physicians", "Ear, Nose and Throat", "Physicians", "Dermatologists", "Physicians", "Cardiologists", "Healthcare", "Physicians", "Anesthesiologists"],

  entertainment: ["Bar", "Wine Bar", "Bar", "Sports Bar", "Bar", "Hotel Lounge", "Breweries", "Internet Cafes", "Nightlife", "Nightlife", "Strip Club", "Nightlife", "Night Clubs", "Nightlife", "Karaoke", "Nightlife", "Jazz and Blues Cafe", "Nightlife", "Hookah Lounges", "Nightlife", "Adult Entertainment", "Recreation", "Theatrical Productions", "Symphony and Opera", "Sports Venues", "Social Clubs", "Psychics and Astrologers", "Party Centers", "Music and Show Venues", "Museums", "Movie Theatres", "Fairgrounds and Rodeos", "Entertainment", "Dance Halls and Saloons", "Circuses and Carnivals", "Casinos and Gaming", "Bowling", "Billiards and Pool", "Art Dealers and Galleries", "Arcades and Amusement Parks", "Arts and Entertainment", "Aquarium", "Athletic Fields", "Baseball", "Basketball", "Batting Cages", "Boating", "Campgrounds and RV Parks", "Canoes and Kayaks", "Combat Sports"],


  Food: ["Winery", "Food and Drink", "Vegan and Vegetarian", "Food and Drink", "Turkish", "Thai", "Swiss", "Sushi", "Steakhouses", "Spanish", "Seafood", "Scandinavian", "Portuguese", "Pizza", "Moroccan", "Middle Eastern", "Mexican", "Mediterranean", "Latin American", "Korean", "Juice Bar", "Japanese", "Italian", "Indonesian", "Indian", "Ice Cream", "Greek", "German", "Gastropub", "French", "Food Truck", "Fish and Chips", "Filipino", "Fast Food", "Falafel", "Food and Drink", "Restaurants", "Chinese", "Caribbean", "Cajun", "Cafe", "Burrito", "Burgers", "Breakfast Spot", "Brazilian", "Barbecue", "Bakery", "Bagel Shop", "Australian", "Asian", "American", "African", "Afghan"],

  healthcare: ["Psychologists", "Pregnancy and Sexual Health", "Podiatrists", "Physical Therapy", "Optometrists", "Nutritionists", "Nurses", "Mental Health", "Medical Supplies and Labs", "Hospitals, Clinics and Medical Centers", "Emergency Services", "Dentists", "Counseling and Therapy", "Chiropractors", "Blood Banks and Centers", "Alternative Medicine", "Healthcare", "Healthcare Services", "Acupuncture"],

  transportation: ['Taxi', 'Cab', 'Subway', 'Travel', 'Transportation Centers', 'Tolls and Fees', 'Rail', 'Public Transportation Services', 'Parking', 'Car Service', 'Airlines and Aviation Services', 'Airports']
}



class Expenses extends Component {

  render() {
    let budgetArr = []
    let plaidArr = [], sum = 0, cat = {}, transaction, found = false
    { this.props.transactions ? transaction = this.props.transactions.transactions : null }
    console.log("props in expenses", this.props)
    return (
      <div>
        {this.props.budget.budget ?
          Object.keys(this.props.budget.budget).map(key => {
            if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
              sum += Number(this.props.budget.budget[key])
              budgetArr.push({ x: key, y: Number(this.props.budget.budget[key]) })
            }
          }) : null}

        <h1>Total Expenses: ${sum} </h1>
        {budgetArr.length ?
          <BarChart
            axes
            grid
            colorBars
            height={300}
            width={900}
            data={budgetArr}
          /> : null}
        {this.props.plaid.transactions.transactions ?

          this.props.plaid.transactions.transactions.map(obj => {
            found = false
            console.log(obj.category, 'name', obj.amount)

            Object.keys(categories).map(keys => {
              if (obj.category) {
                categories[keys].map((values, index) => {
                  if (values === obj.category[0]) {
                    found = true
                    console.log("tureeeeieieieiiei", values, obj.category[0], categories.hasOwnProperty(keys))
                    if (cat.hasOwnProperty(keys) === false) {
                      cat[keys] = obj.amount

                      console.log('matches')
                    }
                    else cat[keys] += obj.amount
                  }

                })
              }


            })
            if (!found) {
                console.log(obj.amount, "obj!!!!!!", cat )
                if (cat.hasOwnProperty('other') === false)
                  cat['other'] = obj.amount
                else cat['other'] +=obj.amount
              }
          })

          : null}
        {Object.keys(cat).map(key => {
          plaidArr.push({ x: key, y: cat[key] })
        })
        }
        {plaidArr.length ?
          <BarChart
            axes
            grid
            colorBars
            height={300}
            width={900}
            data={plaidArr}
          /> : null}
        {console.log(cat, 'cat********')}

        {this.props.budget.budget ?
          <table className="table table-bordered">
            <thead className="habits" >
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Cost</th>
              </tr>
            </thead>

            {Object.keys(this.props.budget.budget).map((key, index) => {
              if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{key}</td>
                      <td>{this.props.budget.budget[key]}</td>

                    </tr>
                  </tbody>)
              }

            })}
          </table> : null}
      </div>
    )

  }
}

export default connect(
  ({ modal, auth, budget, plaid }) => ({ modal: modal, user: auth, budget: budget, plaid }),
  { modalShow, logout },
)(Expenses)
