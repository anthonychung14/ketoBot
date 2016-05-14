import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, Heading, ButtonCircle } from 'rebass'
import { Table, Thead, Th, Tr, } from 'Reactable'

export class PlannerFill extends Component {  
  constructor(props) {
    super(props)
  }

  renderCard(element, key){
    let nutrientTable = Object.assign({}, {
      'Available': element.servings,
      'Calories': element.calories,
      'Protein': element.protein,
      'Fat': element.fat,
      'Carbs': element.carbs - element.fiber,
    })

    return (
      <Card rounded={true} width={350} key={key}>
        <Heading level={2} size={3}>{element.name}</Heading>
        <Table className='table' data={[nutrientTable]} />
      </Card>
    )
  }

  render() {        
    console.log(this.props.fridgeItems)
    return (              
        <section className={`${styles}`}>        
          <h3>Suggested Fillers</h3>
          {this.props.fridgeItems.map((element, key) => this.renderCard(element, key))}        
        </section>
    );
  }
}


