import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Table, Thead, Th, Tr, } from 'Reactable'
import { Card, Heading, ButtonCircle } from 'rebass'

import AddFillForm from 'components/PlannerAddFillForm'

 const initialFormValue = {
  initialValues: {
    fillerServings: 1
  }
}

export class PlannerFill extends Component {  
  constructor(props) {
    super(props)
  }

  renderCard(element, key){
    let nutrientTable = Object.assign({}, {
      'Available': element.servings,
      'Protein': element.protein,
      'Carbs': element.carbs - element.fiber,
      'Fat': element.fat,      
      'Calories': element.calories,
    })

    return (
      <Card rounded={true} width={400} key={key}>
        <Heading level={2} size={3}>{element.name}</Heading>
        <Table className='table' data={[nutrientTable]} />
        <AddFillForm {...initialFormValue} filler={element} form={element.name}/>          
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


