import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
        
import { styles } from './styles.scss';
import * as actionCreators from '../../actions/createMealPlan'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';

import { Flex, Box } from 'reflexbox'

import { PlannerTabView } from '../../components/PlannerTabView'
import { KetoMagicView } from '../../components/KetoMagicView'


function mapStateToProps(state) {
  return {     
    chosenRecipes: state.mealPlan.chosenRecipes,
    servingMap: state.mealPlan.servingMap,
    fridgeItems: state.fridge.fridgeItems,
    staples: state.staples.stapleData
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
          <Tab label="Current" value={0} />            
          <Tab label="ketoMagic" value={1} />
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
            <PlannerTabView 
              chosenRecipes={this.props.chosenRecipes} 
              servingMap={this.props.servingMap}
              fridgeItems={this.props.fridgeItems}
              staples={this.props.staples} />
          </div>          
          <div className="tabView">            
            <KetoMagicView />
          </div>          
        </SwipeableViews>
        </div>                
        <div className="totals">                
          
        </div>
             
      </section>      
    );
  }
}
