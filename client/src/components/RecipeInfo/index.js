import React, { Component } from 'react';

export class RecipeInfo extends Component {

  constructor(props) {
    super(props);    
  }

  render() {        
    let recipe = this.props.recipe || {}
    if (!recipe.nutrition) {
      return (
        <span>No nutritional info here. Choose something else. Or fix your parser you filthy animal</span>
      )
    } else
    return (
      <div>
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
              <li key={element.name}>{element.rawString}</li>
            )}
          )}
        </ul>
      </div>
    )
  }
}