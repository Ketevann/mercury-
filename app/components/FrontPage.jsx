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
                            <h3>Stop living paycheck to paycheck and control your life.</h3>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary"><Link id="about" to="/about">Learn More</Link></button>
                                <button type="button" className="btn btn-secondary">Sign Up</button>
                                <ul className="btn btn-secondary">
                                    {!this.props.user ?
                                        <li><a href="#" onClick={() => this.handleClick()}> Login / Sign Up </a></li>
                                        : <div><span className="whoami-user-name">{this.props.user && this.props.user.name}</span>
                                            <button className="logout" onClick={this.props.logout}>Logout</button></div>}
                                </ul>
                            </div>
                        </div>
                    </header>
                </body>

            </div>

        )
    }


}

