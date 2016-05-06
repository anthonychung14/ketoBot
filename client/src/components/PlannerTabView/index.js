import React, { Component } from 'react';

import { PlannerFill } from 'components/PlannerFill'
import { PlannerCalorieCount } from 'components/PlannerCalorieCount'

/* component styles */
import { styles } from './styles.scss';

export class PlannerTabView extends Component {  
    constructor(props) {
      super(props)
    }
    
  render() {    
    return (              
        <section className={`${styles}`}>
          <PlannerFill />
          <PlannerCalorieCount 
              chosenRecipes={this.props.chosenRecipes} />
        </section>
    );
  }
}
