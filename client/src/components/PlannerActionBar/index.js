import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calcRemaining } from '../../reducers/selectors/calcSelectors'
import * as actionCreators from '../../actions/ketoMagicMealActions'

import { Table, Thead, Th, Tr, } from 'Reactable'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {    
    remaining: calcRemaining(state),
    userData: state.userPlan.userPlan,
    mealPlanArray: state.ketoMealPlan.mealPlanArray    
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlannerActionBar extends Component {  
  constructor(props) {
      super(props)
    }


  activateBot() {
    console.log("the bot has been activated")
    this.props.actions.sendForAlgo(this.props.remaining)
    //display some funky animation while we wait
  
  }

  render() {                    
    return (              
        <section className={`${styles}`}>
            <h3>Action</h3>   
            <button onClick={this.activateBot.bind(this)}>Press The Button</button>            
        </section>
    );
  }
}

