import React, { Component } from 'react';

import { DigiFridgeWindow }from 'components/DigiFridgeWindow'
import { DigiFridgeTabView } from 'components/DigiFridgeTabView';

/* styling */      
import { styles } from './styles.scss';

export class DigiFridge extends Component {
  
  constructor(props){
    super(props);   
  }

  render() {
    return (
      <section className={`${styles}`}>
        <DigiFridgeTabView />                
        <DigiFridgeWindow />
      </section>
    );
  }
}
