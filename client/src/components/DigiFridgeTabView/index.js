import React, { Component } from 'react';

/* styling */      
import { styles } from './styles.scss';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';

export class DigiFridgeTabView extends Component {
  
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
        <Tabs
          className="tabs"
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          <Tab label="Staples" value={0} />            
          <Tab label="Fridge" value={1} />
        </Tabs>                  
        
        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          <div className='tabView'>
            <h2>StapleView</h2>
          </div>
          <div className="tabView">            
            <h2>FridgeView</h2>
          </div>
        </SwipeableViews>        
      </section>
    );
  }
}
