import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class UserData extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      
    }
  render() {    

    return (              
        <section className={`${styles}`}>
        <h1>Hello~</h1>
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc
