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
          <h3>Here you have cards to suggest fridge Items to fill in the rest</h3>        
        </section>
    );
  }
}


