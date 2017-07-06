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
      console.log("bla")
        evt.preventDefault()
        const dates = {
            startDate: evt.target.startDate.value,
            endDate: evt.target.endDate.value
        }
        this.props.fetchTransactions(dates.startDate, dates.endDate)
    }


  render() {
    let budgetArr = []
    let plaidArr = [], transactions, sum = 0, sum2= 0,  cat = {}, transaction, found = false, combine = {}, val

    console.log("props in expenses", this.props)


    if (!this.props.user) return null
        console.log('PROPS', this.props)

        transactions = this.props.transactions.transactions
        if (transactions !== undefined){
            var tot = this.props.barChartTr.reduce((total, val) => {
                console.log('VAL+TOTAL', val.amount, total)
                return total + val.amount
            }

                , 0)}
        console.log('TOT', tot);


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
                        <h4> Monthly Budget </h4>
                        <h5>${this.props.monthlyBudget}</h5>
                        <h4> Total Spent</h4>
                        {tot && <h5>${tot.toFixed(2)}</h5>}
                        <h4> Amount Left </h4>
                        {tot && <h5>${(this.props.monthlyBudget - tot).toFixed(2)}</h5>}
                        <div className="text">
                            <h3>Spending Habits</h3>
                        </div>
                        </div>



        {this.props.budget.budget ?
          Object.keys(this.props.budget.budget).map(key => {
            if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
              sum += Number(this.props.budget.budget[key])
              budgetArr.push({ x: key, y: Number(this.props.budget.budget[key]) })
            }
          }) : null}

        <h1>Total Budget Expenses: ${sum} </h1>
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
            if (obj.amount > 0) val = obj.amount
            else val = 0
            Object.keys(categories).map(keys => {
              if (obj.category) {
                if (categories[keys].indexOf(obj.category[0]) !== -1) {
                  found = true
                  if (cat.hasOwnProperty(keys) === false) {
                    cat[keys] = val
                  }
                  else cat[keys] += val
                }

              }
            })
            if (!found) {
              if (cat.hasOwnProperty('other') === false)
                cat['other'] = val
              else cat['other'] += val
            }
          })
          : null}

          {this.props.budget.budget ?

            Object.keys(this.props.budget.budget).map(key =>{
            if (cat.hasOwnProperty(key)=== false)
              combine[key] = 0
            else combine[key] = cat[key]
          })
         : null }
         {console.log(combine, 'combine', cat, 'cat')}
         {this.props.plaid.transactions.transactions ?
        Object.keys(combine).map(key => {
          if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id'){
            if(Number(cat[key])>0)
          sum2 += Number(cat[key])
          plaidArr.push({ x: key, y: cat[key] })
        }
        console.log('sun', sum2)
        })
     : null }
      <h1>Total Expenses: ${sum2.toFixed(2)} </h1>
      {console.log(plaidArr, "111111")}
        {plaidArr.length > 0 ?
          <BarChart
            axes
            grid
            colorBars
            height={300}
            width={900}
            data={plaidArr}
          /> : null}
        {console.log(cat, 'cat********')}
         <h3 > Budget Expenses </h3>

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
           <h3 >  Expenses </h3>
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
                        transactions && transactions.map((item, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        {item.category ? (<td>{item.category[0]}</td>) : (<td>N/A</td>)}
                                        <td>{item.amount}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }

                </table>
                <div>       </div>

      </div>
    )

  }
}

const barChart = (items) => {
    console.log('ITEMS', items)
    var toLoop = items.transactions
    var loopLength = items.total_transactions
    console.log('LOOPSTUFF', toLoop, loopLength)
    var things = {}
    var arr = []
    if (toLoop !== undefined) {
        for (var i = 0; i < loopLength; i++) {
            var name = (toLoop[i].category) ? toLoop[i].category[0] : 'N/A';
            if (toLoop[i].amount > 0 && name !== 'Transfer') {
                things[name] = things[name] || 0
                things[name] += toLoop[i].amount
            }
            console.log(things)
        }
        console.log('things!!!', things)
        for (var val in things) {
            console.log(val)
            arr.push({ type: val, amount: things[val] })
        }
        //return arr;
        return arr
    }
    return 'failed'
}

export default connect(
  ({ modal, auth, budget, plaid }) => ({ modal: modal, transactions: plaid.transactions,user: auth, budget: budget, plaid, monthlyBudget: 3000, barChartTr: barChart(plaid.transactions),
 }),
  { modalShow, logout, fetchTransactions },
)(Expenses)



