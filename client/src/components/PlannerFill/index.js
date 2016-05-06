import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

import { RecipeInfo } from 'components/RecipeInfo'

export class PlannerFill extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      
    }
  
    renderRecipe() {

    }

  render() {        
    return (              
        <section className={`${styles}`}>        
        <RecipeInfo recipe={this.props.chosenRecipes} />        
        </section>
    );
  }
}


