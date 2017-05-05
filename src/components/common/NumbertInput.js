import React from 'react';
import classnames from 'classnames';

class NumberInput extends React.Component {
    render() {
        let {error, value, name, label} = this.props;

        let wrapperClass = classnames({
            'form-group': true,
            'has-error': error && error.length > 0
        });

        let inputOnChange = (event) => {
            this.props.onChange(event.target.name, event.target.value);
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{label}</label>
                <div className="field">
                    <input
                        type="number"
                        name={name}
                        className="form-control"
                        min="0"
                        step='0.01'
                        value={value ? value : 0.00}
                        onChange={inputOnChange}/>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

NumberInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.number,
    error: React.PropTypes.string
};

export default NumberInput;