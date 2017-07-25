 import React, { Component } from 'react'
 import { BarChart } from 'react-easy-chart'

 const Chart = props => {
   return (
   <BarChart
    axes
    grid
    colorBars
    height={300}
    width={900}
    data={props.data}
  />)
 }
 export default Chart
