import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchFridge } from '../../../actions/fridgeActions'
import { fetchStaples } from '../../../actions/createMealPlan'
import { stapleModal, addStaplePlan } from '../../../actions/items'

/* component styles */
import { styles } from './styles.scss';
import { StapleShow } from '../StapleShow'
import { StapleModal } from '../StapleModal'

function mapStateToProps(state) {
  return { 
      modalState: state.modalState,
      fridgeItems: state.fridge.fridgeItems,
      stapleData: state.staples.stapleData
  };
}

function mapDispatchToProps(dispatch) {    
  return { actions: bindActionCreators({fetchFridge, fetchStaples, stapleModal, addStaplePlan}, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export class StapleWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchFridge()
    this.props.actions.fetchStaples()
  }

  render() {
    return (
     <div>
       <h2>Weekly staples</h2>
       <button onClick={this.props.actions.stapleModal}>Add staple meal </button>
       <StapleModal 
            modalState = {this.props.modalState}
            stapleModal={this.props.actions.stapleModal} 
            fridgeItems={this.props.fridgeItems}/>
       <StapleShow
            stapleData = {this.props.stapleData}
            addStaplePlan={this.props.actions.addStaplePlan}/>
     </div>
    );
  }
}