import React, { Component } from 'react';
import { reduxForm } from 'redux-form'

import { createDiet } from '../../actions/items'

/* component styles */
import { styles } from './styles.scss';


class UserForm extends Component {  
  render() {
    const { fields: {calories, fats, carbs, protein}, handleSubmit } = this.props;
    return (              
        <section className={`${styles}`}>
        <form onSubmit={handleSubmit(this.props.createDiet)}>          

          <div className="form-group">
            <label>Calories</label>
            <input type="text" className="form-control" {...calories} />
          </div>

          <div className="form-group">
            <label>Fats</label>
            <input type="text" className="form-control" {...fats} />
          </div>

          <div className="form-group">
            <label>Net Carbs</label>
            <input type="text" className="form-control" {...carbs} />
          </div>

          <div className="form-group">
            <label>Protein</label>
            <input type="text" className="form-control" {...protein} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc.

export default reduxForm({
  form: 'nutritionForm',
  fields: ["calories", "fats", "carbs", "protein"]
}, null, { createDiet })(UserForm);
