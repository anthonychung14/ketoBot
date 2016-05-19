import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Table, Thead, Th, Tr, } from 'Reactable'
import { Card, Heading, ButtonCircle } from 'rebass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import AddStapleForm from 'components/PlannerAddStapleForm'

 const initialFormValue = {
  initialValues: {
    fillerServings: 1
  }
}

export class PlannerFillStaple extends Component {  
  constructor(props) {
    super(props)
  }

  componentWillMount() { 
    this.props.fetchStaples()    
  }

  renderCard(element, key){
    let stapleNutri = element.nutrition
    let nutrientTable = Object.assign({}, {
      'Protein': stapleNutri.protein,
      'Carbs': stapleNutri.net_carb,
      'Fat': stapleNutri.fat,      
      'Calories': stapleNutri.calories,
    })

    return (      
      <Card rounded={true} width={400} key={key}>
        <Heading level={2} size={3}>{element.recipe.title}</Heading>
        <Table className='table' data={[nutrientTable]} />
        <AddStapleForm {...initialFormValue} staples={element} form={element.recipe.title}/>          
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
          {this.props.staples.map((element, key) => this.renderCard(element, key))}                  
          </ReactCSSTransitionGroup>
        </section>
    );
  }
}


