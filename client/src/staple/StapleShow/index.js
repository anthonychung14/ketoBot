import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'


export class StapleShow extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      
    }
    
    renderRecipe() {
    return (
        <Card rounded={true} width={256} key={1}>
          <Heading level={2} size={3}>{"Test Title"}</Heading>
          <Text> {"More Test"} </Text>
          <input className="modalButton" type="button" value=" Quick Look " />
        </Card>
    )
    }

    render() {    

    return (              
        <section className={`${styles}`}>
        {this.renderRecipe()}
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc
