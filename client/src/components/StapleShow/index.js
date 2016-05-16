import React, { Component, PropTypes } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text, ButtonCircle } from 'rebass'
import { Table } from 'Reactable'
import Icon from 'react-geomicons'

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
      this.props.addStaplePlan(element, 1)
      this.props.addPlanModal(element)
    }

    renderIngreds(element) {      
      return element.ingreds.map(ingred => {          
        return Object.assign({
          Servings: ingred.amount,
          Name: ingred.name
        })
      })
    }

    renderNutrients(element, index) {        
        return (        
          <div>                                
            <Table className="table" data ={this.renderIngreds(element)}/>            
          </div>        
        )
      }

    renderRecipe(element, index) {      
      return (
          <Card rounded={true} width={300} key={index}>
            <Heading level={2} size={3}>{element.recipe.title}</Heading>
            {this.renderNutrients(element)}
            
            <div className="actions">
            <div>
            <ButtonCircle title="No">
            <Icon
              fill="currentColor"
              height="2em"
              name="no"
              width="2em"/>
            </ButtonCircle>
            <h5>Nope</h5>
            </div>
        
            <div>
            <ButtonCircle title="Info">
            <Icon
              fill="currentColor"
              height="2em"
              name="list"
              width="2em"/>
            </ButtonCircle>
            <h5>Info</h5>
            </div>     

            <div>
            <ButtonCircle onClick={this.submit.bind(this, element)} title="Add">
            <Icon
              fill="currentColor"
              height="2em"
              name="check"
              width="2em"/>
            </ButtonCircle>
            <h5>Add</h5>
            </div>
          </div>                      
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
