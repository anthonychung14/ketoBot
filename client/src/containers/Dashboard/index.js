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

export class Dashboard extends Component {
  constructor(props){
    super(props);    
  }


  render() {
    return (
      <section className={`${styles}`}>
        <h1> omg route?</h1>
      </section>
    );
  }
}
