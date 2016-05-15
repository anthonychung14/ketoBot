import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text, ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'
import { RecipeModal } from 'components/RecipeModal'
import { Button } from 'react-bootstrap'

export class RecipeCard extends Component {  
  render() {
    return (
        <Card rounded={true} width={350}>
        <CardImage src={this.props.element.image} />
        <Heading level={2} size={3}>{this.props.element.title}</Heading>          
        
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
          <ButtonCircle title="More">
          <Icon
            fill="currentColor"
            height="2em"
            name="list"
            width="2em"/>
          </ButtonCircle>
          <h5>More</h5>
          </div>
          
          <div>
          <ButtonCircle title="Add">
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
}    
