import React, { Component } from 'react';
import { PieChart, LineChart } from 'react-d3';


/* component styles */
import { styles } from './styles.scss';


export default class UserFoods extends Component {  
    constructor(props) {
      super(props)
    }  

  render() {    
    console.log(this.props, "got props?")
    return (              
        <section className={`${styles}`}>
        <h3>History of orders</h3>
        <div>
        <h3>Rank order of food</h3>

        </div>
        </section>
    );
  }
}
