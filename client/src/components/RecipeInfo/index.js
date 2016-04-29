import React, { Component } from 'react';

export class RecipeInfo extends Component {

  constructor(props) {
    super(props);    
  }

  render() {    
    let recipe = this.props.recipe || {}
    console.log(recipe, "this is the recipe")
    if (!recipe.nutrition) {
      return (
        <span>No nutritional info here. Choose something else. Or fix your parser you filthy animal</span>
      )
    } else
    return (
      <div>
      <h4>This week, you are cooking...</h4>
      <h3>{recipe.recipe.title}</h3>
      <h4>Nutritional Information</h4>
      <ul>
        <li>{recipe.nutrition.calories} calories</li>
        <li>{recipe.nutrition.protein} protein</li>
        <li>{recipe.nutrition.fat} fat</li>
        <li>{recipe.nutrition.net_carb} carbs</li>
      </ul>

      <h4>Ingredients</h4>
        <ul>
          {recipe.ingreds.map(element => {
            return (
              <li key={element.name}>{element.amount + " " +element.measurement+ " " +element.name}</li>
            )}
          )}
        </ul>
      </div>
    )
  }
}