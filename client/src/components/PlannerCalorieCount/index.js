import React, { Component } from 'react';
import { connect } from 'react-redux';

import { calcTotalSelector, calcRemaining, calcPercent } from '../../reducers/selectors/calcSelectors'

import { Table, Thead, Th, Tr, } from 'Reactable'
let Line = require('rc-progress').Line;

import { Flex, Box } from 'reflexbox'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {
    totals: calcTotalSelector(state),
    remaining: calcRemaining(state),
    percentCal: calcPercent(state)
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlannerCalorieCount extends Component {  
    constructor(props) {
      super(props)
    }

  buildRecipeRow(element, index) {    
    let nutri = element.recipe.nutrition
    let serveMap = this.props.servingMap    
    let servings = serveMap[element.recipe.recipe.id]
    
    return Object.assign({}, {      
      Info: element.recipe.recipe.title,
      Servings: servings,
      Calories: nutri.calories * servings,
      Fat: nutri.fat * servings,
      Protein: nutri.protein * servings,
      Carbs: nutri.net_carb * servings
    })
  }
  
  render() {            
    let tableData = this.props.chosenRecipes.map((element, index) => this.buildRecipeRow(element, index))
    let macs = [].concat(tableData, this.props.totals, this.props.remaining)    
    
    return (              
        <section className={`${styles}`}>
            <h3>Meal Plan</h3>
            <Table className="table" data={macs}/>          
            <div>
            <h4>Calories</h4>
            <Line percent="50" strokeWidth="4" strokeColor="#66ff66"/>
            </div>
            
            <div>
            <h4>Protein</h4>
            <Line percent="20" strokeWidth="4" strokeColor="#66ff66"/>
            </div>
            
            <div>
            <h4>Fat</h4>
            <Line percent="22" strokeWidth="4" strokeColor="#66ff66"/>
            </div>
            
            <div>
            <h4>Carbs</h4>
            <Line percent="68" strokeWidth="4" strokeColor="#66ff66"/>
            </div>
        </section>
    );
  }
}

