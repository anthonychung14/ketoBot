import React, { Component } from 'react';

/* components */
import { Recipes } from '../../components/Recipes';
import { Search } from '../../components/Search'
        
import { styles } from './styles.scss';

/* Swipe the swipe */
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export class AllRecipes extends Component {
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

  render() {
    return (
      <section className={`${styles}`}>
        <h3>Choose a new recipe for the week</h3>
        <Tabs
          className="tabs"
          onChange={this.handleChange}
          value={this.state.slideIndex}>
            <Tab label="ketoSearch" value={0} />
            <Tab label="fridgeSearch" value={1} />                        
        </Tabs>
        
        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          <div className="tabView">
            <Search/>
          </div>
          <div className="tabView">
            <Recipes/>
          </div>                    
        </SwipeableViews>

      </section>
    );
  }
}
