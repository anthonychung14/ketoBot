import React, { Component } from 'react';
import { Fridge } from '../../Fridge'

/* component styles */
import { styles } from './styles.scss';

export class ChosenFridge extends Component {  
    constructor(props) {
      super(props)
    }
    
    componentWillMount() {

    }

  render() {    
    return (              
        <section className={`${styles}`}>
          <h4>Fridge DB</h4>

        </section>
    );
  }
}