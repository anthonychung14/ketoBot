import React, { Component } from 'react';
import * as actionCreators from '../../actions/items'
import { openModal } from '../../actions/modalActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'
import { RecipeModal } from 'components/RecipeModal'
import { Button } from 'react-bootstrap'

function mapStateToProps(state) {  
  return { 
    recipes: state.recipesUser.recipes.all,   
    recData: state.recipesUser.recData,     
    modalState: state.modalState 
  };
}

function mapDispatchToProps(dispatch) {
  actionCreators.openModal = openModal  
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

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
    let nutrition = this.props.recData.nutrition[element.id] || null
    let ingreds = this.props.recData.ingredients[element.id] || null
    this.props.actions.openModal(element, nutrition, ingreds)    
  }

  renderRecipe(element, index) {
    let boundRecipeInfo = this.getRecipeInfo.bind(this, element)
    return (
        <Card rounded={true} width={250} key={index}>
        <CardImage src={element.image} />
        <Heading level={2} size={3}>{element.title}</Heading>
          <Text>
            <Button bsStyle="info" className="modalButton" onClick={boundRecipeInfo}>Quick Look</Button>
            <Button bsStyle="success" className="modalButton" onClick={boundRecipeInfo}>Quick Look</Button>
            <Button bsStyle="danger" className="modalButton" onClick={boundRecipeInfo}>Quick Look</Button>            
          </Text>
        </Card>
    )
  }

  render() {
    console.log(this.props)
    return (
      <section className={`${styles}`}>       
        <div className="recipeHeader">
        </div>
        {this.props.recipes
          .filter((element,key) => this.props.recData.nutrition[element.id])
          .map((element,key) => this.renderRecipe(element,key))
          }
        <RecipeModal
          modalState ={this.props.modalState}
          openModal={this.props.actions.openModal}
          addStaplePlan={this.props.actions.addStaplePlan}/>      
        </section>
    );
  }
}    

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
