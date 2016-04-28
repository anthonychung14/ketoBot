import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class UserData extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      //since redis lives on Django, you now need to build out a route for it
      //make GET request that goes on the same URL in action creators
      //update state with data as JSON
      //serialize it before you send it
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
