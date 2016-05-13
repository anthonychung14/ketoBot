import React, { Component } from 'react';      
import { styles } from './styles.scss';

export class KetoMagicUser extends React.Component {
  constructor(props){
    super(props);      
  }  

  render() {
    return (      
      <section className={`${styles}`}>                              
          <h3>Directionssss</h3>                                
          <button onClick={this.props.sendForAlgo} className="">Press The Button</button>
          <button className="">Yes I approve!</button>
          <button className="">Show me another</button>          
      </section>      
    );
  }
}
