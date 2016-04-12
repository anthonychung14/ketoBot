import React, { Component } from 'react';
import * as actionCreators from '../../actions/items'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'

import { RecipeModal } from 'components/RecipeModal'

function mapStateToProps(state) {
  return { recipes: state.recipesUser.macros.all, modalState: state.modalState };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

//Roadblock: based on this click, we want to make an async call to the DB based on a prop of element

//based on the random API call, we're stuck again. Do we make two sequential calls to the API? naw
//Easiest solution: after component mounts, we map out all the ids of the random foods retrieved, then make one more
//API call based on those ids only. We hold those in memory and then serve them when clicked.

//In reality, I think I can do this when I have redis. I can stick all the data I got into redis

//Best practice solution: Redo your table schema

//After choosing one thing to cook, we will save the list of ingredients for purchase
//We will then pass this off to Numpy to initiate the matrix solver for the rest

export class Recipes extends Component {
  componentWillMount () {
    this.props.actions.fetchRecipes()
    .then(function(data) {
      console.log(data.recipes, "this is a promise?")
    })
  }

  getRecipeInfo (element, index) {
    console.log(element)
    this.props.actions.openModal(element)    
  }

  renderRecipe(element, index) {
    let boundRecipeInfo = this.getRecipeInfo.bind(this, element, index)
    return (
        <Card rounded={true} width={256} key={index}>
          <CardImage src={element.image} />
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
          openModal={this.props.actions.openModal}
          />
      </section>
    );
  }
}