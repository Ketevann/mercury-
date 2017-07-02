import React, { Component } from 'react'
import { Link } from 'react-router'
import { VictoryPie, VictoryChart, VictoryScatter, VictoryLine, VictoryBar, VictoryTheme, VictoryAxis } from 'victory'
//import PieChart from './PieChart'
import { connect } from 'react-redux'

class Spending extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('PROPS', this.props)
        let transactions = this.props.transac.transactions
        if (transactions !== undefined)
            var tot = this.props.barChartTr.reduce((total, val) => {
                console.log('VAL+TOTAL', val.amount, total)
                return total + val.amount
            }
                , 0)
        console.log('TOT', tot);
        return (
            <div className="spendinghabits">
            <div>
                <h4> Monthly Budget </h4>
                <h5>${this.props.monthlyBudget}</h5>
                <h4> Total Spent</h4>
                {tot && <h5>${tot.toFixed(2)}</h5>}
                <h4> Amount Left </h4>
                {tot && <h5>${(this.props.monthlyBudget - tot).toFixed(2)}</h5>}
                <div className="transaction">
                    <h3 > Monthly Transactions </h3>
                </div>
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
                <div className="text">
                    <h3>Spending Habits</h3>
                </div>
                <div className="chart col-md-6">
                    <h6>Amount Spent by Category</h6>
                    {/*<VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                    >
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`$${x}`)}
                        />
                        <VictoryBar
                            //[{type:'dog',amount:10},{type:'cat',amount:7}]
                            data={this.props.barChartTr}
                            //data={this.props.barChartTr}
                            x="type"
                            y="amount"
                        />
                    </VictoryChart>*/}
                    <VictoryBar
                        data={this.props.barChartTr}
                        x="type"
                        y="amount"
                        labels={(datum) => datum.x}
                        theme={VictoryTheme.material}
                    />
                </div>
                <div className="chart col-md-6">
                    <h6>Percent Spent by Category</h6>
                    <VictoryPie
                        data={this.props.barChartTr}
                        x="type"
                        y="amount"
                        labels={(datum) => {
                            console.log('DATUM', datum.y / 4700)
                            return `${datum.x}: ${Math.floor(datum.y / tot * 100)}%`
                        }}
                        theme={VictoryTheme.material}
                    />
                </div>
                {/*<div className="chart col-md-4">
                    <h2>Savings Progress</h2>
                    <VictoryChart height={450}>
                        <VictoryScatter
                            style={{ data: { fill: "purple" } }}
                            symbol="square"
                            size={5}
                            data={[
                                { x: -4, y: -4 },
                                { x: 4, y: 2, fill: "red" },
                                { x: 1.8, y: 3 }
                            ]} />
                        <VictoryLine
                            y={(data) => data.x} />
                        <VictoryBar
                            style={{ data: { fill: "orange" } }}
                            data={[
                                { x: 2, y: -3 },
                                { x: -3, y: 4 },
                                { x: 1, y: 3 }
                            ]} />
                    </VictoryChart>
                </div>*/}

            </div>
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
    state => ({
        transac: state.plaid.transactions,
        barChartTr: barChart(state.plaid.transactions),
        monthlyBudget: 3000
    }), null)(Spending)

