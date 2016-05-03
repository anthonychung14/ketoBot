import React, { Component } from 'react';
import { StapleWindow } from '../../staple/StapleWindow'

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
        <StapleWindow/> 
        </section>
    );
  }
}

