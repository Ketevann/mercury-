import React from 'react';
import Chart from './Chart'


const TransactionsTable = (props) => {
  let expensesSum
  return(
  <div className="transactable">
    <h3 >  Expenses </h3>
    <table className="table table-bordered transactable">
      <thead className="habits" >
        <tr>
          <th>#</th>
          <th>Location</th>
          <th>Type</th>
          <th>Cost</th>
        </tr>
      </thead>
      {
        props.transactions.map((item, index) => {
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
    </table>
  </div>
  )
}

export default TransactionsTable







