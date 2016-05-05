import React, { Component } from 'react';
import * as actionCreators from '../../actions/fridgeActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'

function mapStateToProps(state) {
  return {
    fridgeRecipes: state.fridge.recipes,
    searchTerms: state.fridge.searchTerms
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

  renderSearchRecipe(element, index) {
    return (
      <Card rounded={true} width={256} key={index}>
          <Heading level={2} size={3}>{element.title}</Heading>
          <Text> {element.time} time! </Text>
          <input className="modalButton" type="button" value=" Quick Look "/>
      </Card>
    )
  }

  render() {
    let searchRecipes = this.props.fridgeRecipes.searchRecipe || []
    return (
      <section className={`${styles}`}>        
        {searchRecipes.map((element, index) => this.renderSearchRecipe(element, index))}        
      </section>
    );
  }
}

