import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/items'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return { 
    object: state.object
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export class ExSmartComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     
    );
  }
}