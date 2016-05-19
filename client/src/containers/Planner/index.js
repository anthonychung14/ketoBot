import React, { Component } from 'react';
import { styles } from './styles.scss';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';

import { PlannerTabView } from 'components/PlannerTabView'
import { PlannerCalorieCount } from 'components/PlannerCalorieCount'

export class Planner extends Component {
  constructor(props){
    super(props);  
  }  

  render() {
    return (      
      <section className={`${styles}`}> 
        <PlannerTabView />
        <PlannerCalorieCount />
      </section>                                   
    );
  }
}
