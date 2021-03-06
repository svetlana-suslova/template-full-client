import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Label} from 'components/bootstrap';

class NumberInput extends React.Component {
  render() {
    let {error, value, name, label} = this.props;

    let wrapperClass = classnames({
      'form-group': true,
      'has-error': error && error.length > 0
    });

    let inputOnChange = event => {
      this.props.onChange(event.target.name, event.target.value);
    };

    return (
      <div className={wrapperClass}>
        <Label htmlFor={name}>{label}</Label>

        <input
          type="number"
          name={name}
          className="form-control"
          min="0"
          step="1"
          value={value ? value : 0.0}
          onChange={inputOnChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string
};

export default NumberInput;
