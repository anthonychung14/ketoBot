import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'
import Snackbar from 'material-ui/lib/snackbar';

import { Table, Thead, Th, Tr, } from 'Reactable'


export class StapleShow extends Component {  
    constructor(props) {
      super(props)
      this.state = {
        open: false,
      };
    }
    
    handleTouchTap() {      
      console.log("trying to open")
      this.setState({
        open: true,
      });
    };

    handleRequestClose() {
      console.log("trying to close")
      this.setState({
        open: false,
      });
    };

    submit(element) {      
      this.handleTouchTap()      
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

    renderRecipe(element, index) {
      return (
          <Card rounded={true} width={256} key={index}>
            <Heading level={2} size={3}>{element.recipe.title}</Heading>
            {this.renderNutrients(element)}
            <input onClick={this.submit.bind(this, element)} className="modalButton" type="button" value=" Add to Plan " />
          </Card>
        )
      }

    render() {    
      return (              
        <section className={`${styles}`}>
        {this.props.stapleData.map((element,index) => this.renderRecipe(element, index))}
        <Snackbar
          open={this.state.open}
          message="Added to Meal Plan"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc
