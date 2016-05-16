import React, { Component } from 'react';
import * as actionCreators from '../../actions/userPlan'
import { fetchNutrition, fetchRecipes, addStaplePlan } from '../../actions/items'
import { openModal } from '../../actions/modalActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import { RecipeCard } from 'components/RecipeCard'

function mapStateToProps(state) {
  return { 
    searchResults: state.search.searchResults, 
    searchRecData: state.search.recData};
}

function mapDispatchToProps(dispatch) {
  actionCreators.fetchNutrition = fetchNutrition
  actionCreators.fetchRecipes = fetchRecipes
  actionCreators.addStaplesPlan = addStaplePlan
  actionCreators.openModal = openModal
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Search extends Component {
  
  getRecipeInfo (element, index) {        
    let boundFetchNutrition = this.props.actions.fetchNutrition 
    let searchRecipesID = this.props.searchResults.map((element, key) => {
      return element.id
    })
    boundFetchNutrition(searchRecipesID)
    .then((data) => {
      let nutrition = this.props.recData.nutrition[element.id] || null
      let ingreds = this.props.recData.ingredients[element.id] || null
      this.props.actions.openModal(element, nutrition, ingreds)      
    })    
  }

  renderSearch(element, index) {
    let boundRecipeInfo = this.getRecipeInfo.bind(this, element)
    return (
        <ReactCSSTransitionGroup 
              transitionAppear={true} 
              transitionName="card" 
              transitionAppearTimeout={1500} transitionEnterTimeout={1500} transitionLeaveTimeout={1300}>
        <Card rounded={true} width={256} key={index}>
        <CardImage src={element.image} />
          <Heading level={2} size={3}>{element.title}</Heading>
          <Text> {element.time} time! </Text>
          <input onClick={boundRecipeInfo} className="modalButton" type="button" value=" Quick Look " />
      </Card>      
      </ReactCSSTransitionGroup>
    )
  }

  render() {
    return (
      <section className={`${styles}`}>                      
          <div className="search">        
          {this.props.searchResults.map((element, index) => <RecipeCard element={element} key={index}/>)}
          </div>        
      </section>
    );
  }
}