import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from 'material-ui/lib/styles/colors';
import { PlannerActionBar } from 'components/PlannerActionBar'
import { calcTotalSelector, calcRemaining, calcPercentCal, calcPercentPro, calcPercentFat, calcPercentCarb } from '../../reducers/selectors/calcSelectors'

import { Table, Thead, Th, Tr, } from 'Reactable'
let Line = require('rc-progress').Line;

import { Flex, Box } from 'reflexbox'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {
    totals: calcTotalSelector(state),
    remaining: calcRemaining(state),
    percentCal: calcPercentCal(state),
    percentPro: calcPercentPro(state),
    percentCarbs: calcPercentCarb(state),
    percentFat: calcPercentFat(state)
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

  buildFillRow(element, index) {
    let id = element.id
    let servings = this.props.fridgeServings[id]
    return Object.assign({}, {
      Info: element.name,
      Servings: servings,
      Calories: element.calories * servings,
      Fat: element.fat * servings,
      Carbs: (element.carbs - element.fiber) * servings,
      Protein: element.protein * servings
    })
  }
  
  render() {            
    let chosenRecipeRows = this.props.chosenRecipes.map((element, index) => this.buildRecipeRow(element, index))
    let fridgeFillRows = this.props.fridgeFill.map((element, index) => this.buildFillRow(element, index))
    let macs = [].concat(chosenRecipeRows, fridgeFillRows, this.props.totals, this.props.remaining)    
    
    return (              
        <section className={`${styles}`}>
            <h3>Meal Plan</h3>
            <Table className="table" data={macs}/>          
            
            <div className="progressBar">
              <div>
              <h4>Calories: <span className="percent">{Math.floor(this.props.percentCal*100)}%</span></h4>
              <Line percent={this.props.percentCal*100} strokeWidth="2" strokeColor={Colors.cyan700}/>
              </div>
              
              <div>
              <h4>Protein: <span className="percent">{Math.floor(this.props.percentPro*100)}%</span></h4>              
              <Line percent={this.props.percentPro*100} strokeWidth="2" strokeColor={Colors.cyan700}/>
              </div>
              
              <div>
              <h4>Fat: <span className="percent">{Math.floor(this.props.percentFat*100)}%</span></h4>
              <Line percent={this.props.percentFat*100} strokeWidth="2" strokeColor={Colors.cyan700}/>
              </div>
              
              <div>
              <h4>Carbs: <span className="percent">{Math.floor(this.props.percentCarbs*100)}%</span></h4>
              
              <Line percent={this.props.percentCarbs*100} strokeWidth="2" strokeColor={Colors.cyan700}/>            
            </div>
            <PlannerActionBar />       
              
            </div>
        </section>
    );
  }
}

