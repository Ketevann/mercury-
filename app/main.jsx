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
import Spending from './components/SpendingHabits'
import Budget from './components/Budget'
import About from './components/About'


import LinkAccounts from './components/LinkAccounts'

import BudgetForm from './components/BudgetForm'



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
      <LinkAccounts />
      <Login />




    </div>
  )

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/link" component={LinkAccounts} />
        <Route path='/spending' component={FrontPage} />

        <Route path='/budget' component={Budget} />

      </Route>
      <Route path='/home' component={FrontPage} />
      <Route path='/about' component={About} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
