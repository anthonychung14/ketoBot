import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
        
import * as actionCreators from '../../actions/createMealPlan'
import { fetchFridge } from '../../actions/fridgeActions'
import { fetchStaples } from '../../actions/createMealPlan'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';
import { Flex, Box } from 'reflexbox'

import { KetoMagicView } from 'components/KetoMagicView'
import { PlannerFill } from 'components/PlannerFill'
import { PlannerFillStaple } from 'components/PlannerFillStaple'


/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {     
    chosenRecipes: state.mealPlan.chosenRecipes,
    servingMap: state.mealPlan.servingMap,
    fridgeItems: state.fridge.fridgeItems,
    staples: state.staples.stapleData,
    fridgeFill: state.mealPlan.fridgeFill,
    fridgeServings: state.mealPlan.fridgeServings
  }
}

function mapDispatchToProps(dispatch) {  
  actionCreators.fetchFridge = fetchFridge
  actionCreators.fetchStaples = fetchStaples
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlannerTabView extends Component {  
    constructor(props) {
      super(props)
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
          <Tab label="Fridge" value={0} />            
          <Tab label="Staples" value={1} />
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
            <PlannerFill 
              fridgeItems={this.props.fridgeItems}
              staples={this.props.staples}
              fetchFridge={this.props.actions.fetchFridge}/>          
          </div>          
          <div className="tabView">            
            <PlannerFillStaple 
              fetchStaples={this.props.actions.fetchStaples}
              staples={this.props.staples}/>              
          </div>
          </SwipeableViews>
          
          </div>                               
          
        </section>
    );
  }
}          

