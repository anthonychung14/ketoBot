import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/items'

/* components */
import { Fridge } from 'components/Fridge'
import { FridgeModal } from 'components/FridgeModal'
import { FridgeSearch } from 'components/FridgeSearch'
        
import { styles } from './styles.scss';


function mapStateToProps(state) {
  return {     
    modalState: state.modalState };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class DigiFridge extends Component {
  constructor(props){
    super(props);   

  }

  render() {
    return (
      <section className={`${styles}`}>
        <Fridge openModal={this.props.actions.formModal}/>
        <button onClick={this.props.actions.formModal}>Add to Fridge</button>
        <FridgeModal 
          modalState={this.props.modalState}
          openModal={this.props.actions.formModal}/>
        <FridgeSearch />
      </section>
    );
  }
}
