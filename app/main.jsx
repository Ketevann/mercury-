'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import {emailSettings} from './reducers/email'
import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FrontPage from './components/FrontPage'
import Spending from './components/SpendingHabits'
import Budget from './components/Budget'
import Front from './components/Front'
import Footer from './components/Footer'
import Email from './components/Email'
import Goals from './components/Goals'


import {fetchTransactions} from './reducers/plaid.jsx'

import Expenses from './components/Expenses'
import {userExpenses} from './reducers/budget'

import BudgetForm from './components/BudgetForm'




import About from './components/About'



import LinkAccounts from './components/LinkAccounts'



const getTransac = () => {
  store.dispatch(fetchTransactions());
}
const getInitalEmailSettings = () => {
  store.dispatch(emailSettings())
}
const ExampleApp = connect(
  ({ auth, modal }) => ({ user: auth, modal })
)(
  ({ user, children }) =>
    <div>
      {<nav>

      </nav>}
      <Navbar />
      {/* Render our children (whatever the router gives us) */}
      {children}
            <Footer />

      {/*<Sidebar /> */}






    </div>
  )

const getExpenses = () => {
  console.log('in get expenses')
  store.dispatch(userExpenses())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/link" component={LinkAccounts} />
        <Route path='/spending' component={Spending} onEnter={getTransac}/>
         <Route path='/budget' component={Budget} />
         <Route path="/addexpenses" component={BudgetForm} />
        <Route path="/myexpenses" component={Expenses} onEnter={getExpenses} />
         <Route path='/home' component={Front} />
         <Route path='/emailSettings' component={Email} onEnter={getInitalEmailSettings} />
         <Route path='/goals' component={Goals}/>
      </Route>
      {/*<Route path='/home' component={FrontPage} />
      <Route path='/about' component={About} />
      <Route path='*' component={NotFound} /> */}
    </Router>
  </Provider>,
  document.getElementById('main')
)
