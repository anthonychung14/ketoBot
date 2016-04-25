import React, { Component } from 'react';
import * as actionCreators from '../../actions/userPlan'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'

function mapStateToProps(state) {
  return { searchResults: state.search.searchResults };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export default class Search extends Component {
  componentWillMount () {
    
  }

  handleClick() {
    console.log("props back", this.props.searchResults)
    //This should also be capable of searching on its own
  }

  renderSearch(element, index) {
    return (
      <Card rounded={true} width={256} key={index}>
          <Heading level={2} size={3}>{element.title}</Heading>
          <Text> {element.time} time! </Text>
          <input className="modalButton" type="button" value=" Quick Look " />
      </Card>
    )
  }

  render() {
    return (
      <section className={`${styles}`}>        
        {this.props.searchResults.map((element, index) => this.renderSearch(element, index))}                          
      </section>
    );
  }
}