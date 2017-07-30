import React from 'react';
import Chart from './Chart'
import TransactionsTable from './TransactionsTable'


const DisplayBudget = (props) => {
  console.log(props, 'tjissss')
  var arr = [], sum = 0, expensesSum
  return (
  <div className="expense">

      <div className="montlybudget">

        <div className="text">
          <h3>Spending Habits</h3>
        </div>
      </div>
        {/*if the budget exists, creating a an array of objects with x, y coordinates and making a bar chart by sending the data to Chart component as props */}
        {props.budget !== null ?
          <Chart data={props.plaidArr} />
          : null}
          {props.transacArr.length > 0 ?
           <h4>Total Expenses: ${expensesSum = Object.keys(props.expenseCategory).reduce((total, num) =>{
              console.log(total, props.expenseCategory[num])
              return total+props.expenseCategory[num]
           }, 0).toFixed(2)} </h4> : null }
           {props.transacArr.length > 0 ?
          <Chart data={props.transacArr} />
          :null}
            <h3>Budget Expenses</h3>
        {/*creates the budget expenses table if the budget exists*/}
      {props.budget ?
        <table className="table table-bordered">
          <thead className="habits" >
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Cost</th>
            </tr>
          </thead>
          {
            Object.keys(props.budget).map((key, index) => {
              if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id'){
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{key}</td>
                      <td>{props.budget[key]}</td>
                    </tr>
                  </tbody>)
              }
            })
          }
        </table> : null}
    {props.transactions?
      <TransactionsTable transactions={props.transactions} /> :null}
  </div>
)
}

export default DisplayBudget
