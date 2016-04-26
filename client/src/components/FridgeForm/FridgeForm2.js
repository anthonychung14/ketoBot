import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'
import { styles } from './styles.scss';

import { postFridge } from '../../actions/fridgeActions'

/* component styles */
export const fields = ["category", "name", "amount", "measurement", "servings", "calories", "fat", "protein", "carbs", "fiber"]

class FridgeForm2 extends Component {  
  onSubmit(props) {
    this.props.postFridge(props)
  }

  render() {
    const { fields: {calories, protein, fat, carbs, fiber}, 
            handleSubmit, 
            previousPage, 
            submitting} = this.props;
    return (              
        <section className={`${styles}`}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>          
          <div>
            <label>Calories</label>
            <input type="text" className="form-control" {...calories} />
          </div>

          <div>
            <label>Protein</label>
            <input type="text" className="form-control" {...protein} />
          </div>

          <div>
            <label>Fat</label>
            <input type="text" className="form-control" {...fat} />
          </div>

          <div>
            <label>Carbs</label>
            <input type="text" className="form-control" {...carbs} />
          </div>
          <div>
            <label>Fiber</label>
            <input type="text" className="form-control" {...fiber} />
          </div>
          <div>
          <button type="button" disabled={submitting} onClick={previousPage}>
            <i/> Previous
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Finish
          </button>
        </div>
        </form>
        </section>
    );
  }
}

FridgeForm2.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc.

export default reduxForm({
  form: 'fridgeForm',
  fields,
  destroyOnUnmount: false
}, null, { postFridge })(FridgeForm2);
