import React, { Component } from 'react';
import { Table, Thead, Th, Tr, } from 'Reactable'
import { Donut } from 'rebass'

import { Flex, Box } from 'reflexbox'

/* component styles */
import { styles } from './styles.scss';

// pass down the data from userGoals
const macWeek = {
  Info: <strong>Weekly Reqs</strong>,
  Calories: 1800 * 6,
  Protein: 130 * 6,
  Fat: 150 * 6,
  Carbs: 20 * 6
}

export class PlannerCalorieCount extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      console.log(this.props)
    }

  buildRecipeRow(element, index) {    
    let nutri = element.recipe.nutrition
    let servings = element['servings'].recipeServings
    //The times equals seems to have mutated the original data
    return Object.assign({}, {      
      Info: element.recipe.recipe.title,
      Servings: servings,
      Calories: nutri.calories * servings,
      Fat: nutri.fat * servings,
      Protein: nutri.protein * servings,
      Carbs: nutri.net_carb * servings
    })
  }

  calcRemaining() {    
    //MacWeek minus a sum of chosenRecipes
    let start = {
      'Info': <strong>Total</strong>,
      'Calories': 0,
      'Fat': 0,
      'Protein': 0,
      'Carbs': 0
    }

    let total = this.props.chosenRecipes.reduce((prev, curr) => {
      const nutri = curr.recipe.nutrition      
      prev['Calories'] += nutri['calories']
      prev['Fat'] += nutri['fat']
      prev['Protein'] += nutri['protein']
      prev['Carbs'] += nutri['net_carb']
      return prev
    }, start)

    return total
  }
  
  render() {            
    let tableData = this.props.chosenRecipes.map((element, index) => this.buildRecipeRow(element, index))
    let totalPlan = this.calcRemaining()
    let macs = [].concat(tableData, totalPlan, macWeek)

    const percentDone = totalPlan['Calories']/macWeek['Calories']

    return (              
        <section className={`${styles}`}>
        <h4>Calorie Count</h4>        
        <Box p={2}>
          <Flex align='center'>
            <Box px={2}>
              <Table className="table" data={macs}/>
            </Box>
            <Box px={2}>
              <Donut
            color="primary"
            size={150}
            strokeWidth={28}
            value={percentDone}/>      
            </Box>

          </Flex>
        </Box>         
        </section>
    );
  }
}

