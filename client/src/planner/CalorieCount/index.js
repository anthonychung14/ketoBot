import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

const userMacros = {
  calories: 1800,
  protein: 130,
  fat: 150,
  carbs: 20
}

export class CalorieCount extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      
    }
  
  render() {    
    return (              
        <section className={`${styles}`}>
        <h4>I'm a dumb component that calculates calories</h4>
        </section>
    );
  }
}

