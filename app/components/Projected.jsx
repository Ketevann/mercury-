import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchTransactions } from '../reducers/plaid'

class Projected extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt) {
        evt.preventDefault()
        const dates = {
            startDate: evt.target.startDate.value,
            endDate: evt.target.endDate.value,
            projectionDate: evt.target.projectionDate.value
        }
        this.props.fetchTransactions(dates.startDate, dates.endDate)
    }

    render() {
        let transactions = this.props.transac.transactions
        console.log('TRAN', typeof transactions)
        
        return (
            <div>
                <form className="pure-form" onSubmit={(evt) => this.handleSubmit(evt)}>
                    <h4>Select Reference Date Range:</h4>
                    <label for="startDate">Start Date:  </label>
                    <input className="pure-input-rounded" name="startDate" type="date" />
                    <br />
                    <label for="endDate">End Date:  </label>
                    <input className="pure-input-rounded" name="endDate" type="date" />
                    <br /><br />
                    <h4>Select Projection Date:</h4>
                    <input className="pure-input-rounded" name="projectionDate" type="date" />
                    <br />
                    <button className="pure-button" type="submit" className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        transac: state.plaid.transactions
    }), { fetchTransactions })(Projected)


