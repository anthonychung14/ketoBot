import React, { Component } from 'react';
import { connect } from 'react-redux';

import { calcTotalSelector, calcRemaining, calcPercentCal, calcPercentPro, calcPercentFat, calcPercentCarb } from '../../reducers/selectors/calcSelectors'

import { Table, Thead, Th, Tr, } from 'Reactable'
let Line = require('rc-progress').Line;

import { Flex, Box } from 'reflexbox'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {
    totals: calcTotalSelector(state),
    remaining: calcRemaining(state),
    percentCal: calcPercentCal(state),
    percentPro: calcPercentPro(state),
    percentCarbs: calcPercentCarb(state),
    percentFat: calcPercentFat(state)
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlannerActionBar extends Component {  
    constructor(props) {
      super(props)
    }


  render() {                    
    return (              
        <section className={`${styles}`}>
            <h3>Action</h3>   
            <button onClick={this.props.sendForAlgo}>Press The Button</button>
            <button className="">Yes I approve!</button>
            <button className="">Show me another</button>         
        </section>
    );
  }
}

