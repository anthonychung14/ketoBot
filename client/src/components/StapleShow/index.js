import React, { Component, PropTypes } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'

import { Table, Thead, Th, Tr, } from 'Reactable'


export class StapleShow extends Component {  
    static contextTypes = {
      router: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
        servings: 1
      };
    }    

    submit(element) {            
      // this.props.addStaplePlan(element)
      // this.context.router.push('planner')
      this.props.addPlanModal(element)
    }

    renderIngreds(element) {      
      return element.ingreds.map(ingred => {          
        return Object.assign({
          Amount: ingred.amount + " servings" ,
          Name: ingred.name
        })
      })
    }


    renderNutrients(element, index) {
        const nutri = element.nutrition                        
        
        return (        
          <div>                                
            <Table className="table" data ={this.renderIngreds(element)}/>
            <input onClick={this.submit.bind(this, element)} className="modalButton" type="button" value=" Add to Plan " />                        
            <Table className="table" data={[
              {
                "Total Cal": nutri.calories,
                Protein: nutri.protein,
                Fat: nutri.fat,
                Carbs: nutri.net_carb
              }
              ]}/>                        
          </div>        
        )
      }

    renderRecipe(element, index) {      
      return (
          <Card rounded={true} width={300} key={index}>
            <Heading level={2} size={3}>{element.recipe.title}</Heading>
            {this.renderNutrients(element)}
          </Card>
        )
      }

    render() {          
      return (              
        <section className={`${styles}`}>        
        {this.props.stapleData.map((element,index) => this.renderRecipe(element, index))}        
        </section>
    );
  }
}
