import React, { Component } from 'react'
import { Link } from 'react-router'
import { VictoryPie, VictoryChart, VictoryScatter, VictoryLine, VictoryBar } from 'victory'
import Navbar from './Navbar'

export default class Goals extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div >

                <body className="home">
                    
                    <header id="top" className="header">
                        <div className="text-vertical-center">
                            <h1>About Mercury</h1>
                            <h3>We bring together everything from balances and bills to your credit score and more. It’s your whole budget in one place.</h3>
                           
                        </div>
                    </header>
                </body>

            </div>

        )
    }


}

