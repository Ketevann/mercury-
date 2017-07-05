import React, { Component } from 'react'
import { Link } from 'react-router'
import { VictoryPie, VictoryChart, VictoryScatter, VictoryLine, VictoryBar } from 'victory'
import Navbar from './Navbar'

export default class About extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div >

                <body className="homepage">
                    
                    <header id="top" className="header">
                        <div className="text-vertical-center">
                            <h1>About Mercury</h1>
                            <h3>Mercury is a web-based personal financial management service that allows you to access all of their financial information in one place. You can track bank, credit card, investment, and loan balances and transactions as well as create budgets and set financial goals.</h3>
                           
                        </div>
                    </header>
                </body>

            </div>

        )
    }


}

