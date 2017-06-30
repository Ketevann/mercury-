import React, { Component } from 'react'
import { Link } from 'react-router'
import { VictoryPie, VictoryChart, VictoryScatter, VictoryLine, VictoryBar } from 'victory'
import Navbar from './Navbar'

export default class FrontPage extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div >

                <body className="home">
                    <Navbar />
                    <header id="top" className="header">
                        <div className="text-vertical-center">
                            <h1>Mercury</h1>
                            <div>
                                <h3>Stop living paycheck to paycheck and control your life.</h3>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary"><Link id="about" to="/about">Learn More</Link></button>
                                <div>
                                    {!this.props.user ?
                                        <button className="btn btn-secondary"><a href="#" onClick={() => this.handleClick()}> Sign Up </a></button>
                                        : <div><span className="whoami-user-name">{this.props.user && this.props.user.name}</span>
                                            <button className="logout" onClick={this.props.logout}>Logout</button></div>}
                                </div>
                            </div>
                        </div>
                    </header>
                </body>

            </div>

        )
    }


}

