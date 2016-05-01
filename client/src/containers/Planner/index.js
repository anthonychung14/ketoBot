import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
        
import { styles } from './styles.scss';
import * as actionCreators from '../../actions/createMealPlan'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';

import { ChosenRecipe } from '../../planner/ChosenRecipe'
import { ChosenFridge } from '../../planner/ChosenFridge'
import { ChosenStaples } from '../../planner/ChosenStaples'
import { CalorieCount } from '../../planner/CalorieCount'


function mapStateToProps(state) {
  return {     
    chosenRecipes: state.mealPlan.chosenRecipes
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

  componentWillMount() {
    console.log(this.props.chosenRecipes, "inside the planner container. what do I have?")  
  }

  render() {
    return (
      <section className={`${styles}`}>
        <div className="title">
          <h3>Build Plan</h3>
        </div>

        <Tabs
          className="tabs"
          onChange={this.handleChange}
          value={this.state.slideIndex}>
            <Tab label="Recipes" value={0} />            
            <Tab label="Fillers" value={1} />
        </Tabs>

        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          <div className="tabView">            
            <ChosenStaples />
          </div>          
          <div className="tabView">
            <ChosenFridge />
          </div>          
        </SwipeableViews>
        
        <div className="total">
          
        </div>
      </section>
    );
  }
}
