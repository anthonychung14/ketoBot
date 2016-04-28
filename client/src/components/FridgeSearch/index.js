import React, { Component } from 'react';
import * as actionCreators from '../../actions/fridgeActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'

function mapStateToProps(state) {
  return {
    fridgeSearch: state.fridge.fridgeItems
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class FridgeSearch extends Component {
   constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.actions.fetchFSearch()
  }

  render() {
    return (
      <section className={`${styles}`}>
        <h2>This is a thing</h2>
        
      </section>
    );
  }
}

