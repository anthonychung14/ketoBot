import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calcRemaining } from 'reducers/selectors/calcSelectors'
import * as actionCreators from 'actions/ketoMagicMealActions'
import { openModal } from 'actions/modalActions'

import { Table, Thead, Th, Tr, } from 'Reactable'

/* component styles */
import { styles } from './styles.scss';
import { KetoBotModal } from 'components/KetoBotModal'


function mapStateToProps(state) {
  return {    
    remaining: calcRemaining(state),
    userData: state.userPlan.userPlan,
    mealPlanArray: state.ketoMealPlan.mealPlanArray,
    modalState: state.modalState
  }
}

function mapDispatchToProps(dispatch) {
  actionCreators.openModal = openModal
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlannerActionBar extends Component {  
  constructor(props) {
      super(props)
    }


  activateBot() {    
    this.props.actions.sendForAlgo(this.props.remaining)
    this.props.actions.openModal()
  }

  render() {                    
    return (              
        <section className={`${styles}`}>
            <h3>Nutrition Profile</h3>   
            <button onClick={this.activateBot.bind(this)}>KetoBot. Activate</button>

            <KetoBotModal 
              modalState={this.props.modalState}
              openModal={this.props.actions.openModal}
              mealPlanArray={this.props.mealPlanArray}/>
        </section>
    );
  }
}

