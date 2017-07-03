import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import WhoAmI from './WhoAmI'
import View from './Modal'
import {connect} from 'react-redux'
import {modalShow} from "../reducers/modal"
import store from '../store'
import {logout} from 'APP/app/reducers/auth'




import {BarChart} from 'react-easy-chart';


class Expenses extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let budgetArr=[]
    let budgeting = []
    console.log("props in expenses", this.props)
    return(
      <div>
       <h1>budget</h1>
       {this.props.budget.budget?
        Object.keys(this.props.budget.budget).map(key =>{
          if (key!=='created_at' && key!=='updated_at' && key!=='user_id' && key!=='id')
           budgetArr.push({x: key, y: Number(this.props.budget.budget[key]) })
        }) : null }
        {budgetArr.forEach(val =>{
          console.log(val)
        })}
     { budgetArr.length ?
       <BarChart

    axes
    grid

    colorBars
    height={300}
    width={900}
    data={budgetArr}
  /> : null }
  {this.props.budget.budget?
     <table className="table table-bordered">
      <thead className="habits" >
          <tr>
              <th>#</th>
              <th>Type</th>
              <th>Cost</th>
          </tr>
      </thead>

      { Object.keys(this.props.budget.budget).map((key,index) =>{
                   if (key!=='created_at' && key!=='updated_at' && key!=='user_id' && key!=='id'){
return(
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
   ({ modal, auth, budget }) => ({ modal: modal, user: auth, budget: budget }),
  {modalShow, logout},
)(Expenses)
