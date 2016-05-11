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
  Protein: 130 *6 ,
  Fat: 150 *6,
  Carbs: 20*6
}

export class PlannerCalorieCount extends Component {  
    constructor(props) {
      super(props)
    }

  buildRecipeRow(element, index) {    
    let nutri = element.recipe.nutrition
    let servings = element['servings']
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

  calcTotal() {    
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
      prev['Calories'] += nutri['calories'] * curr.servings
      prev['Fat'] += nutri['fat'] * curr.servings
      prev['Protein'] += nutri['protein'] * curr.servings
      prev['Carbs'] += nutri['net_carb'] * curr.servings
      return prev
    }, start)

    return total
  }

  calcRemain(total) {
    let start = {
      'Info': <strong>Remaining</strong>,
      'Calories': macWeek['Calories'] - total['Calories'],
      'Fat': macWeek['Fat'] - total['Fat'],
      'Protein': macWeek['Protein'] - total['Protein'],
      'Carbs': macWeek['Carbs'] - total['Carbs'],
    }
    return start
  }
  
  render() {            
    let tableData = this.props.chosenRecipes.map((element, index) => this.buildRecipeRow(element, index))
    let totalPlan = this.calcTotal()
    let remainingMacs = this.calcRemain(totalPlan)
    let macs = [].concat(tableData,totalPlan, remainingMacs, macWeek)
    const percentDone = totalPlan['Calories']/macWeek['Calories']
    return (              
        <section className={`${styles}`}>
        <Box p={2}>
          <Flex align='center'>
            <Box px={2}>
              <Table className="table" data={this.macs}/>
            </Box>
            <Box px={2}>
              <Donut
                color="primary"
                size={150}
                strokeWidth={28}
                value={this.percentDone}/>      
            </Box>

          </Flex>
        </Box>         
        </section>
    );
  }
}

