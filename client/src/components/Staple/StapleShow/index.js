import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'

import { Table, Thead, Th, Tr, } from 'Reactable'


export class StapleShow extends Component {  
    constructor(props) {
      super(props)
      this.state = {
        servings: 1
      };
    }    


    submit(element) {            
      this.props.addStaplePlan(element)
    }

    renderNutrients(element, index) {
        const nutri = element.nutrition
        return (        
          <div>
          <ul>
            {element.ingreds.map(ingred => <li key={ingred.name}>{ingred.amount + " servings " + ingred.name}</li>)}  
          </ul>
            <Table className="table" data={[
              {
                calories: nutri.calories,
                protein: nutri.protein,
                fat: nutri.fat,
                carbs: nutri.net_carb
              }
              ]}/>              
          </div>        
        )
      }

    changeSelect() {
      
    }

    renderRecipe(element, index) {      
      return (
          <Card rounded={true} width={256} key={index}>
            <Heading level={2} size={3}>{element.recipe.title}</Heading>
            {this.renderNutrients(element)}
            <input onClick={this.submit.bind(this, element)} className="modalButton" type="button" value=" Add to Plan " />
            <select className="modalButton" value={this.state.servings} onChange={this.changeSelect}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
          </Card>
        )
      }

    render() {          
      console.log(this.props.stapleData)
      return (              
        <section className={`${styles}`}>
        {this.props.stapleData.map((element,index) => this.renderRecipe(element, index))}        
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc
