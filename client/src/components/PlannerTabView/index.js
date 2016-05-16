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
          <PlannerFill 
              fridgeItems={this.props.fridgeItems}
              staples={this.props.staples}
              fetchFridge={this.props.fetchFridge}/>          
          <PlannerCalorieCount 
              chosenRecipes={this.props.chosenRecipes}              
              servingMap={this.props.servingMap} 
              fridgeFill={this.props.fridgeFill}
              fridgeServings={this.props.fridgeServings}/>                       
        </section>
    );
  }
}
