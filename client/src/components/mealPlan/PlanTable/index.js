import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from 'material-ui/lib/styles/colors';
import { calcTotalSelector, calcRemaining, calcPercentCal, calcPercentPro, calcPercentFat, calcPercentCarb } from '../../reducers/selectors/calcSelectors'

import { Table, Thead, Th, Tr, } from 'Reactable'

import { Flex, Box } from 'reflexbox'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {
    mealPlans: state.ketoMealPlan.mealPlanArray
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlanTable extends Component {  
    constructor(props) {
      super(props)
    }

  // buildRecipeRow(element, index) {    
  //   let nutri = element.recipe.nutrition
  //   let serveMap = this.props.servingMap    
  //   let servings = serveMap[element.recipe.recipe.id]
    
  //   return Object.assign({}, {      
  //     Info: element.recipe.recipe.title,
  //     Servings: servings,
  //     Calories: nutri.calories * servings,
  //     Fat: nutri.fat * servings,
  //     Protein: nutri.protein * servings,
  //     Carbs: nutri.net_carb * servings
  //   })
  // }

  // buildFillRow(element, index) {
  //   let id = element.id
  //   let servings = this.props.fridgeServings[id]
  //   return Object.assign({}, {
  //     Info: element.name,
  //     Servings: servings,
  //     Calories: element.calories * servings,
  //     Fat: element.fat * servings,
  //     Carbs: (element.carbs - element.fiber) * servings,
  //     Protein: element.protein * servings
  //   })
  // }
  
  render() {            
    // let chosenRecipeRows = this.props.chosenRecipes.map((element, index) => this.buildRecipeRow(element, index))
    // let fridgeFillRows = this.props.fridgeFill.map((element, index) => this.buildFillRow(element, index))
    // let macs = [].concat(chosenRecipeRows, fridgeFillRows, this.props.totals, this.props.remaining)    
    console.log(this.props)
    return (              
        <section className={`${styles}`}>
            <h3>Robot Plan</h3>
        </section>
    );
  }
}

            // <Table className="table" data={macs}/>          
