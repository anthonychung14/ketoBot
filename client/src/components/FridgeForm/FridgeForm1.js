import React, { Component } from 'react';
import { reduxForm } from 'redux-form'

import { postPlan } from '../../actions/userPlan'

//TODO: FORM VALIDATION in Fridge Form
//TODO: set default values in the redux form way
//TODO: anticipate fridge items posted by letting them "refill based on previous

/* component styles */
import { styles } from './styles.scss';

export const fields = ["category", "name", "amount", "measurement", "servings"]
class FridgeForm1 extends Component {  
  render() {
    const { fields: {category, name, amount, measurement, servings}, handleSubmit} = this.props;
    return (              
        <section className={`${styles}`}>
        <form onSubmit={handleSubmit}>          
          <div>
          <label>Category</label>
          <div>
            <select {...category} value={category.value}>
              <option value="Protein">Protein</option>
              <option value="Fats">Fats</option>
              <option value="Carbs">Carbs</option>
              <option value="Dairy">Dairy</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruit">Fruit</option>
              <option value="Spices">Spices</option>
            </select>
          </div>
        </div>

          <div>
            <label>Name</label>
            <input type="text" className="form-control" {...name || ''} />
          </div>

          <div>
            <label>Amount per serving</label>
            <input type="text" className="form-control" {...amount || ''} />
          </div>

          <div>
            <label>Measurement</label>
            <input type="text" className="form-control" {...measurement || ''} />
          </div>

          <div>
            <label>Servings</label>
            <input type="text" className="form-control" {...servings || ''} />
          </div>
          
          <div>
            <button type="submit">
              Next <i/>
            </button>
          </div>
        </form>
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc.

export default reduxForm({
  form: 'fridgeForm',
  fields,
  destroyOnUnmount: false
})(FridgeForm1);
