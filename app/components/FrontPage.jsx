import React, { Component } from 'react'
import { Link } from 'react-router'
import { VictoryPie, VictoryChart, VictoryScatter, VictoryLine, VictoryBar } from 'victory';
//import PieChart from './PieChart'

export default class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="home">

                <div className="text">
                    <h1>Spending Habits</h1>
                </div>
                <div className="chart col-md-4">
                    <h2>Breakdown</h2>
                    <VictoryPie />
                </div>
                <div className="chart col-md-4">
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
                </div>
                {/*<div>
                    <PieChart
                        labels
                        data={[
                            { key: 'A', value: 100, color: '#aaac84' },
                            { key: 'B', value: 200, color: '#dce7c5' },
                            { key: 'C', value: 50, color: '#e3a51a' }
                        ]}
                        styles={{
                            '.chart_text': {
                                fontSize: '1em',
                                fill: '#fff'
                            }
                        }}
                    />*/}
                {/*<PieChart />*/}
            </div>


        )
    }


}