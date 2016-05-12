import React, { Component } from 'react';
import { PieChart, LineChart } from 'react-d3';


/* component styles */
import { styles } from './styles.scss';


export default class UserFoods extends Component {  
    constructor(props) {
      super(props)
    }
    
  render() {    
    return (              
        <section className={`${styles}`}>
        <h1>History of orders</h1>
        <div>
        <h2>Rank order of food</h2>

        </div>


        </section>
    );
  }
}
