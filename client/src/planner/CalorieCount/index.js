import React, { Component } from 'react';
import { Table, Thead, Th, Tr, } from 'Reactable'

/* component styles */
import { styles } from './styles.scss';

const macWeek = {
  Info: "Weekly Need",
  Calories: 1800 *6,
  Protein: 130 *6,
  Fat: 150 *6,
  Carbs: 20 *6
}

export class CalorieCount extends Component {  
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      console.log(this.props)
    }

  buildRecipeRow(info, nutri) {    
    //this should map over all recipes that you end up choosing. first off
    //you shouldn't discriminate between staples and not
    

    let obj = {}
    obj['Info'] = info.title
    obj['Calories'] = nutri.calories
    obj['Fat'] = nutri.fat
    obj['Carbs'] = nutri.net_carb
    obj['Protein'] = nutri.protein
    return obj
  }

  calcRemaining(nutri) {    
    if (!this.props.recipeInfo) {
      nutri = {
        calories: 0,
        fat: 0,
        net_carb: 0,
        protein: 0
      }
    }
    let obj = {}    
    obj['Info'] = "Remaining"
    obj['Calories'] = macWeek.Calories - nutri.calories
    obj['Fat'] = macWeek.Fat - nutri.fat
    obj['Carbs'] = macWeek.Carbs - nutri.net_carb
    obj['Protein'] = macWeek.Protein - nutri.protein
    return obj
  }
  
  render() {            
    return (              
        <section className={`${styles}`}>
        <h4>Calorie Count</h4>        
        <Table className="table" data={[
          macWeek, this.buildRecipeRow(), this.calcRemaining(nutri)]} />      
        </section>
    );
  }
}

