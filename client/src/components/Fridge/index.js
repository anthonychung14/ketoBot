import React, { Component } from 'react';
import * as actionCreators from '../../actions/items'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'



export class Fridge extends Component {
   constructor(props) {
    super(props);
  }


  componentWillMount () {
    //Something to get the fridge items you currently have    
  }

  renderCard(element, index) {
    //on mouseover, turn transparent and give short list of items in fridge
    return (
      <Card rounded={true} width={200} key={index}>
        <Heading level={2} size={3}>{element}</Heading>
        <Text> Some text</Text>          
      </Card>
    )
  }

  render() {
    const categories = [ 'Protein' , 'Dairy' , 'Vegetables' , 'Fruit' , 'Spices', 'Carbs' ]
    return (
      <section className={`${styles}`}>
        {categories.map((element,index) => this.renderCard(element, index))}
      </section>
    );
  }
}

