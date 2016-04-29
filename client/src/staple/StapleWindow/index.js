import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/items'


/* component styles */
import { styles } from './styles.scss';
import { StapleShow } from '../StapleShow'
import { StapleModal } from '../StapleModal'

function mapStateToProps(state) {
  return { 
      modalState: state.modalState,
      fridgeItems: state.fridge.fridgeItems  
  };
}

function mapDispatchToProps(dispatch) {    
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export class StapleWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchFridge()
  }

  render() {
    return (
     <div>
       <h2>I will show staples in cards and let you add them too</h2>
       <button onClick={this.props.actions.formModal}>Add staple meal </button>
       <StapleModal 
            modalState = {this.props.modalState}
            openModal={this.props.actions.formModal} 
            fridgeItems={this.props.fridgeItems}/>
       <StapleShow />
     </div>
    );
  }
}