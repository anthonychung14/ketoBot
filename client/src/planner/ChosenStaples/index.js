import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class ChosenStaples extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      
    }
  render() {    

    return (              
        <section className={`${styles}`}>
        <h4>Chosen Staples</h4>
        </section>
    );
  }
}
