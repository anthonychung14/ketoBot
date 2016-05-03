import React, { Component } from 'react';
import { Table, Thead, Th, Tr, } from 'Reactable'
import { Donut } from 'rebass'

import { Flex, Box } from 'reflexbox'

/* component styles */
import { styles } from './styles.scss';

const macWeek = {
  Info: <strong>Weekly Reqs</strong>,
  Calories: 1800 *6,
  Protein: 130 *6,
  Fat: 150 *6,
  Carbs: 20 *6
}

export class CalorieCount extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      console.log(this.props)
    }

  buildRecipeRow(element, index) {    
    let nutri = element.nutrition
    return Object.assign({}, {      
      Info: element.recipe.title,
      Calories: nutri.calories,
      Fat: nutri.fat,
      Protein: nutri.protein,
      Carbs: nutri.net_carb
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
      const nutri = curr.nutrition
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
    let macs = [].concat(macWeek, tableData, totalPlan)

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

