import React, { Component } from 'react';
import { connect } from 'react-redux';

import { calcTotalSelector, calcRemaining, calcPercent } from '../../reducers/selectors/calcSelectors'

import { Table, Thead, Th, Tr, } from 'Reactable'
import { Donut } from 'rebass'

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

  findCal() {
    console.log(this.props.percentCal)
    if (this.props.percentCal < 1) {
      return (
        <Donut
          color="primary"
          size={150}
          strokeWidth={28}
          value={this.props.percentCal}/>
      )
    } else {
      return (
        <span>Too high! </span>
      )
    }
  }
  
  render() {            
    let tableData = this.props.chosenRecipes.map((element, index) => this.buildRecipeRow(element, index))
    let macs = [].concat(tableData, this.props.totals, this.props.remaining)    
    
    return (              
        <section className={`${styles}`}>
        <Box p={2}>
          <Flex align='center'>
            <Box px={2}>              
            <Table className="table" data={macs}/>
            </Box>            
          </Flex>
        </Box>         
        </section>
    );
  }
}

