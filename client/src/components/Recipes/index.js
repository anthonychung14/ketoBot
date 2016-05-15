import React, { Component } from 'react';
import * as actionCreators from '../../actions/items'
import { openModal } from '../../actions/modalActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text, ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'
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
        <Card rounded={true} width={350} key={index}>
        <CardImage src={element.image} />
        <Heading level={2} size={3}>{element.title}</Heading>                  
        <div className="actions">
          <div>
          <ButtonCircle title="No">
            <Icon
              fill="currentColor"
              height="2em"
              name="no"
              width="2em"/>
          </ButtonCircle>
          <h5>Nope</h5>
          </div>

          <div>
          <ButtonCircle onClick={boundRecipeInfo} title="Add">
          <Icon
            fill="currentColor"
            height="2em"
            name="list"
            width="2em"/>
          </ButtonCircle>
          <h5>Info</h5>
          </div>
          
          <div>
          <ButtonCircle title="Add">
          <Icon
            fill="currentColor"
            height="2em"
            name="check"
            width="2em"/>
          </ButtonCircle>
          <h5>Add</h5>
          </div>
        </div>        
        </Card>
    )
  }

  render() {
    console.log(this.props)
    return (
      <section className={`${styles}`}>       
        <div className="filter">
          <h2>Hi</h2>
          <h3>Filter will be here</h3>
        </div>

        <div className="recipes">
        {this.props.recipes
          .filter((element,key) => this.props.recData.nutrition[element.id])
          .map((element,key) => this.renderRecipe(element,key))
          }
        </div>
        <RecipeModal
          modalState ={this.props.modalState}
          openModal={this.props.actions.openModal}
          addStaplePlan={this.props.actions.addStaplePlan}/>      
        </section>
    );
  }
}    

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
