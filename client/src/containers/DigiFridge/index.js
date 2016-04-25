import React, { Component } from 'react';

/* components */
import { Fridge } from 'components/Fridge'
        
import { styles } from './styles.scss';


export class DigiFridge extends Component {
  constructor(props){
    super(props);    
  }

  render() {
    return (
      <section className={`${styles}`}>
        <h2 className="fridgeHeader">I am a fridge</h2>
        <Fridge />
      </section>
    );
  }
}
