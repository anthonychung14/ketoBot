import React, { Component } from 'react';
import { reduxForm, addArrayValue } from 'redux-form'
import PureInput from './PureInput'

import { createStaple } from '../../actions/createMealPlan'

/* component styles */
import { styles } from './styles.scss';

export const fields = [
  'ingredients[].macro',
  
]

class StapleForm extends Component {  
  
  componentWillMount() {
    console.log(this.props.fridgeItems, "did you make it home")
    
  }

  renderOptionsFridge(field, label) {
    return (
      <select {...field} value={field.value}>
      {this.props.fridgeItems
          .filter((element) => element.category === label)
          .map((item) => <option value= {item.name}>{item.name}</option>)}
      </select>
    )
  }

  render() {
    const { fields: { ingredients }, handleSubmit } = this.props;
    return (              
        <section className={`${styles}`}>
        <form onSubmit={handleSubmit(this.props.createStaple)}>          
          
          {!ingredients.length && <div>No Ingredients Yet</div>}

          {ingredients.map((ingred, index) => <div key={index}>
            <label>Ingredient #{index +1}</label>
             <div>
              <select {...ingredients.macro}>
                <option value="Protein">Protein</option>
                <option value="Fats">Fats</option>
                <option value="Vegetable">Vegetable</option>
              </select>
            </div>

          </div>

          )}

          <button type="button" onClick={() => {
            ingredients.addField()    // pushes empty child field onto the end of the array
          }}><i/> Add Ingredient
          </button>
          
          
        </form>
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc.

export default reduxForm({
  form: 'nutritionForm',
  fields 
}, null, { createStaple })(StapleForm);


// <PureInput type="text" placeholder="Ingredient" field={ingredients.macro}/>

// 'ingredients[].servings',
// 'title',
//   'time',
// <div className="form-group">
//             <label>Protein</label>
//               {this.renderOptionsFridge(protein, "Protein")}
//           </div>

//           <div className="form-group">
//             <label>Fats</label>
//               {this.renderOptionsFridge(fats, "Fats")}
//           </div>

//           <div className="form-group">
//             <label>Vegetable</label>
//               {this.renderOptionsFridge(vegetable, "Vegetables")}
//           </div>
