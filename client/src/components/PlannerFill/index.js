import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Table, Thead, Th, Tr, } from 'Reactable'
import { Card, Heading, ButtonCircle } from 'rebass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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

  componentWillMount() { 
    this.props.fetchFridge()
    
  }

  renderCard(element, key){
    let nutrientTable = Object.assign({}, {
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
    return (              
        <section className={`${styles}`}>        
          <ReactCSSTransitionGroup 
              transitionAppear={true} 
              transitionName="example" 
              transitionAppearTimeout={1500} transitionEnterTimeout={1500} transitionLeaveTimeout={1300}>                    
          {this.props.fridgeItems.map((element, key) => this.renderCard(element, key))}                  
          </ReactCSSTransitionGroup>
        </section>
    );
  }
}


