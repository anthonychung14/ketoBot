import React, { Component } from 'react';
import { LineChart } from 'react-d3';


/* component styles */
import { styles } from './styles.scss';

const lineData = [
  {
    name: "Calories",
    values: [ { x: 1, y: 1600 }, { x: 4, y: 1800 }, { x: 8, y: 1700 } ],
    strokeWidth: 3,
    strokeDashArray: "5,5",
  },
  {
    name: "Fat",
    values: [ { x: 1, y: 800 }, { x: 4, y: 900 }, { x: 8, y: 1000 } ]
  },
  {
    name: "Protein",
    values: [ { x: 1, y: 650 }, { x: 4, y: 650 }, { x: 8, y: 700 } ]
  },
  {
    name: "Carbs",
    values: [ { x: 1, y: 400 }, { x: 4, y: 500 }, { x: 8, y: 600 } ]
  }
];

export default class UserChart extends Component {  
    constructor(props) {
      super(props)
    }

    
  render() {    
    return (              
        <section className={`${styles}`}>
        <h1>Average Caloric Intake</h1>
        <LineChart
        legend={true}
        data={lineData}
        width={500}
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 400,
          height: 500}
        }
        yAxisLabel="Calories"
        xAxisLabel="Elapsed Time (Months)"
        gridHorizontal={true}/>
        </section>
    );
  }
}
