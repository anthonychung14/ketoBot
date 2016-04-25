import React, { Component } from 'react';
import * as actionCreators from '../../actions/items'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'

import { RecipeModal } from 'components/RecipeModal'

function mapStateToProps(state) {
  return { 
    recipes: state.recipesUser.recipes.all,
    recipeNutrition: state.recipesUser.recipeNutrition, 
    modalState: state.modalState };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

//In reality, I think I can do this when I have redis. I can stick all the data I got into redis
//After choosing one thing to cook, we will save the list of ingredients for purchase
//We will then pass this off to Numpy to initiate the matrix solver for the rest

export class Recipes extends Component {
  componentWillMount () {
    let boundFetchNutrition = this.props.actions.fetchNutrition 
    this.props.actions.fetchRecipes()
    .then(function(data) {
      let randomRecipesID = data.recipes.map((element, key) => {
        return element.id
      })      
      boundFetchNutrition(randomRecipesID)
    })
  }

  getRecipeInfo (element, index) {        
    let nutrition = this.props.recipeNutrition.nutrition[element.id] || null
    this.props.actions.openModal(element, nutrition)    
  }

  renderRecipe(element, index) {
    let boundRecipeInfo = this.getRecipeInfo.bind(this, element)
    return (
        <Card rounded={true} width={256} key={index}>
          <Heading level={2} size={3}>{element.title}</Heading>
          <Text> {element.time} time! </Text>
          <input className="modalButton" type="button" value=" Quick Look " onClick={boundRecipeInfo} />
        </Card>
    )
  }

  render() {
    return (
      <section className={`${styles}`}>       
        <div className="recipeHeader">
        <h2>Choose something to cook for the week</h2>
        </div>
        {this.props.recipes.map((element,key) => this.renderRecipe(element,key))}
        <RecipeModal
          modalState ={this.props.modalState}
          openModal={this.props.actions.openModal}/>      
        </section>
    );
  }
}
          // <CardImage src={element.image} />