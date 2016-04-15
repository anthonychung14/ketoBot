import React, { Component } from 'react';

/* components */
import { TopImage } from 'components/TopImage';
import { Recipes } from 'components/Recipes';
import { Search } from 'containers/Search'
import UserForm from 'components/UserForm';
        
import { styles } from './styles.scss';


export class Groceries extends Component {
  constructor(props){
    super(props);    
  }

  render() {
    return (
      <section className={`${styles}`}>
        <h1> omg route to groceries?</h1>
      </section>
    );
  }
}
