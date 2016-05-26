import React, { Component } from 'react';

/* components */
import { styles } from './styles.scss';
import { RecipeTabView } from 'components/RecipeTabView'
import Recipes from 'components/Recipes'

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
        <RecipeTabView />
        <Recipes />
      </section>
    );
  }
}
