import React, { Component, PropTypes } from 'react';
import { change } from 'redux-form';
import { connect } from 'react-redux'
import _ from 'lodash';

const propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  formName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  selectedOptions: PropTypes.object.isRequired // Original form field
};

class MultiCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.addValues = this.addValues.bind(this);
  }

  addValues(values) {
    const { formName, fieldName, dispatch } = this.props;
    dispatch(change(formName, fieldName, _.uniq(values)));
  }

  selectedIds() {
    const { selectedOptions } = this.props
    if ( selectedOptions.value ) {
      return selectedOptions.value
    } else if (selectedOptions.initialValue) {
      return selectedOptions.initialValue
    } else {
      return [];
    }
  }

  handleSelectAll(e) {
    e.preventDefault();
    let idsToAdd;

    if (this.props.selectedOptions.length > 0) {
      idsToAdd = [];
    } else {
      idsToAdd = this.props.options.map((opt,id) => id);
    }
    this.addValues(idsToAdd);
  }

  handleChange(e, id) {
    let values = this.selectedIds();

    if (!Array.isArray(values)) { values = [values] };

    if (e.target.checked) {
      values.push(id);
    } else {
      values.splice(_.indexOf(values, id), 1);
    }    
    this.addValues(values);
  }

  render() {
    const options = this.props.options;
    console.log()
    const checkBoxes = options.map((opt, id) => {
      return (
        <div className="typeCook">        
        <label key={id}>          
          <input
            type="checkbox"
            checked={this.selectedIds().indexOf(id) > -1}
            value={opt}
            onChange={(e) => this.handleChange(e, id)} 
          />
          $"hello": hello
        </label>
        </div>
      )
    });

    return (
      <div>
        <button onClick={this.handleSelectAll}>
          Add All
        </button>
        {checkBoxes}
      </div>
    )
  }
}

MultiCheckbox.propTypes = propTypes;
export default MultiCheckbox;