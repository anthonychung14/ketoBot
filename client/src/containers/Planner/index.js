import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
        
import { styles } from './styles.scss';
import * as actionCreators from '../../actions/items'


function mapStateToProps(state) {
  return {     
    modalState: state.modalState };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class Planner extends Component {
  constructor(props){
    super(props);   

  }

  render() {
    return (
      <section className={`${styles}`}>
        <h2>This is a planner</h2>
      </section>
    );
  }
}
