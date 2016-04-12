import React, { Component } from 'react';

/* components */
import { TopImage } from 'components/TopImage';
import { Recipes } from 'components/Recipes';
import { Search } from 'containers/Search'
import UserForm from 'components/UserForm';
        
import { styles } from './styles.scss';

/* Swipe the swipe */
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export class Home extends Component {
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
        <TopImage />
        <Tabs
          className="tabs"
          onChange={this.handleChange}
          value={this.state.slideIndex}>
            <Tab label="Macro Target" value={0} />
            <Tab label="Recipe Recs" value={1} />
            <Tab label="Filler" value={2} />
        </Tabs>

        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          <div className="tabView">
            <UserForm />              
          </div>
          <div className="tabView">
            <Recipes/>
          </div>
          <div className="tabView">
            slide n°3
          </div>
        </SwipeableViews>

      </section>
    );
  }
}
