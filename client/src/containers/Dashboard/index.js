import React, { Component } from 'react';
import * as actionCreators from '../../actions/userPlan'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss';

/* components */
import UserForm from 'components/UserForm';
import UserFoods from 'components/UserFoods';
import UserData from 'components/UserData';
import UserChart from 'components/UserChart'
import HomePage from 'containers/HomePage'
import WizardForm from 'components/UserForm/wizardForm';


/* Swipe Views */
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';
        

function mapStateToProps(state) {
  return { 
    userPlan: state.userPlan,
    userMealPlan: state.userPlan.chosenMealPlans
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class Dashboard extends Component {
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
    console.log(this.props)
    this.props.actions.fetchPlan()
    this.props.actions.fetchMealPlan()
  }

  render() {
    return (
      <section className={`${styles}`}>        
        <Tabs
          className="tabs"
          onChange={this.handleChange}
          value={this.state.slideIndex}>            
            <Tab label="Meal Plan" value={0} />                        
            <Tab label="Physical Goals" value={1} />            
        </Tabs>
        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          <div className="userData">
            <UserData userPlan={this.props.userPlan}/>
            <UserChart />
            <UserFoods mealPlans={this.props.userMealPlan}/>
          </div>
        </SwipeableViews>
      </section>
    );
  }
}

