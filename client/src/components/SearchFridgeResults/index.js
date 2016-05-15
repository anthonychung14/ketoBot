import React, { Component } from 'react';
import * as actionCreators from '../../actions/fridgeActions'
import { RecipeCard } from 'components/RecipeCard'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'

export class SearchFridgeResults extends Component {
   constructor(props) {
    super(props);
  }

  renderSearchRecipe(element, index) {
    return (
      <Card rounded={true} width={350} key={index}>
        <CardImage src={element.image} />
          <Heading level={2} size={3}>{element.title}</Heading>
          <Text> {element.time} time! </Text>
          <input className="modalButton" type="button" value=" Quick Look "/>
      </Card>
    )
  }

  render() {
    let searchRecipes = this.props.fridgeRecipes.searchRecipe || []
    return (
      <section className={`${styles}`}>        
        {searchRecipes.map((element, index) => <RecipeCard element={element} index={index} />)}        
      </section>
    );
  }
}

