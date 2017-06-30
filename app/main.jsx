'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FrontPage from './components/FrontPage'
import Budget from './components/Budget'
import Expenses from './components/Expenses'
import {userExpenses} from './reducers/budget'

import BudgetForm from './components/BudgetForm'




import LinkAccounts from './components/LinkAccounts'




const ExampleApp = connect(
  ({ auth, modal }) => ({ user: auth, modal })
)(
  ({ user, children }) =>
    <div>
      {<nav>
        {/*user ? <WhoAmI/> : <Login/>*/}
      </nav>}
      <Navbar />
      {/* Render our children (whatever the router gives us) */}
      {children}

      <Sidebar />






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
        <Route path='/home' component={FrontPage} />
        <Route path="/jokes" component={Jokes} />
         <Route path='/home' component={FrontPage} />
         <Route path='/budget' component={Budget} />
         <Route path="/addexpenses" component={BudgetForm} />
        <Route path="/myexpenses" component={Expenses} onEnter={getExpenses}/>


      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
