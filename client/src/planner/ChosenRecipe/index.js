import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

import { RecipeInfo } from '../../components/RecipeInfo'

export class ChosenRecipe extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      console.log(this.props)
    }
  
  renderRecipe() {

  }

  render() {    
    let recipe = this.props.chosenRecipe.recipe || []
    return (              
        <section className={`${styles}`}>        
        <RecipeInfo recipe={this.props.chosenRecipe} />        
        </section>
    );
  }
}


