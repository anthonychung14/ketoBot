import React, { Component } from 'react';
import { Table, Thead, Th, Tr, } from 'Reactable'

/* component styles */
import { styles } from './styles.scss';

const macs = {
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
    let obj = {}
    obj['Info'] = info.Info
    obj['Calories'] = nutri.Calories
    obj['Fat'] = nutri.Fat
    obj['Carbs'] = nutri.Carbs
    obj['Protein'] = nutri.Protein
    return obj
  }

  calcRemaining(nutri) {    
    let obj = {}    
    obj['Info'] = "Remaining"
    obj['Calories'] = macs.Calories - nutri.Calories
    obj['Fat'] = macs.Fat - nutri.Fat
    obj['Carbs'] = macs.Carbs - nutri.Carbs
    obj['Protein'] = macs.Protein - nutri.Protein
    return obj
  }
  
  render() {        
    const none = {
      Info: "Choose a meal first",
      Calories: 0, 
      Fat: 0,
      Carbs: 0,
      Protein: 0
    }
    let nutri = this.props.recipeNutrition || none    
    let info = this.props.recipeInfo || none

    return (              
        <section className={`${styles}`}>
        <h4>Calorie Count</h4>        

        <Table className="table" data={[
          macs, this.buildRecipeRow(info, nutri), this.calcRemaining(nutri)]} />      
        </section>
    );
  }
}

