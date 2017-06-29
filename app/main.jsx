'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FrontPage from './components/FrontPage'
import BudgetForm from './components/BudgetForm'


const ExampleApp = connect(
  ({ auth, modal }) => ({ user: auth, modal })
)(
  ({ user, children }) =>
    <div>
      {<nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>}
      <Navbar />
      {/* Render our children (whatever the router gives us) */}
      {children}
     <Sidebar />
     <Login />

    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
<<<<<<< HEAD
        <Route path="/jokes" component={Jokes} />
=======
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={FrontPage} />
>>>>>>> 77404c3a44ed705cf33803f60fedcc1e738d73d5
         <Route path='/home' component={FrontPage} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
