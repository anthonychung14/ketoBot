import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
        
import { styles } from './styles.scss';
import * as actionCreators from '../../actions/createMealPlan'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';

import { ChosenRecipe } from '../../components/planner/ChosenRecipe'
import { ChosenFridge } from '../../components/planner/ChosenFridge'
import { StapleWindow } from '../../components/staple/StapleWindow'
import { CalorieCount } from '../../components/planner/CalorieCount'

import { Flex, Box } from 'reflexbox'


function mapStateToProps(state) {
  return {     
    chosenRecipes: state.mealPlan.chosenRecipes,
    fridgeItems: state.fridge.fridgeItems
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class Planner extends Component {
  constructor(props){
    super(props);  
    this.state={
      slideIndex: 0
    } 
  }  

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  renderTab() {
    return(
      <Tabs
        className="tabs"
        onChange={this.handleChange}
        value={this.state.slideIndex}>
          <Tab label="Recipes" value={0} />            
          <Tab label="Fillers" value={1} />
        </Tabs>                  
    )
  }

  render() {
    return (      
      <section className={`${styles}`}>              
        <div className="staples">
        {this.renderTab()}
        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          <div className="tabView">            
            <StapleWindow />            
          </div>          
          <div className="tabView">            
            <ChosenFridge fridgeItems={this.props.fridgeItems} />
          </div>          
        </SwipeableViews>
        </div>                

        <div className="totals">                
          <CalorieCount
            chosenRecipes={this.props.chosenRecipes}/>
        </div>
             
      </section>      
    );
  }
}
