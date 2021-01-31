import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Form} from 'components/bootstrap';

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  error: PropTypes.string
};

export function NumberInput({name, label, onChange, value, error}) {
  let wrapperClass = classnames({
    'form-group': true,
    'has-error': error && error.length > 0
  });

  function inputOnChange(event) {
    onChange(event.target.name, event.target.value);
  }

  return (
    <div className={wrapperClass}>
      <Form.Label htmlFor={name}>{label}</Form.Label>

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

export function NumberInputReactHookForm({name, label, onChange, defaultValue, register, required}) {
  function inputOnChange(event) {
    onChange(event.target.name, event.target.value);
  }
  const value = defaultValue ? defaultValue : '';

  return (
    <div className="form-group">
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <input
        type="number"
        name={name}
        className="form-control"
        min="0"
        step="0.1"
        defaultValue={value}
        onChange={inputOnChange}
        ref={register({required})}
      />
    </div>
  );
}
