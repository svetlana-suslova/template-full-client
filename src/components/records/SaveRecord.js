import React, {Component} from 'react';
import {Modal, Button, FormGroup} from 'components/bootstrap';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';

import helper from 'helpers/reactHelper';
import config from 'helpers/configHelper';

import NumberInput from 'components/common/NumberInput';
import TextAreaInput from 'components/common/TextAreaInput';
import SelectInput from 'components/common/SelectInput';

class SaveRecord extends Component {
  static propTypes = {
    record: PropTypes.object,
    categories: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  state = {
    dateOptions: {
      dateFormat: config.format.datePicker
    },
    errors: {}
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      errors: {}
    });
  }

  formIsValid() {
    let errors = {};
    let record = this.props.record;

    if (!record.categoryId) {
      errors.categoryId = 'Category field is required.';
    }

    if (!record.cost) {
      errors.cost = 'Cost field is required.';
    }

    if (!record.note) {
      errors.note = 'Note field is required.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  save() {
    if (!this.formIsValid()) return;

    this.props.save();
  }

  onDateChange(date) {
    this.props.onChange('date', new Date(date));
  }

  render() {
    const {record, categories, visible, close} = this.props;
    const {errors, dateOptions} = this.state;

    if (!record) return null;

    record.cost = record.cost ? parseFloat(record.cost) : 0;

    let title = record.id ? 'Edit Record' : 'Add New Record';

    let categoryOptions = categories.map(category => {
      return {value: category.id, label: category.title};
    });

    return (
      <div>
        <Modal isOpen={visible} backdrop="static" toggle={close}>
          <Modal.Header toggle={close}>{title}</Modal.Header>
          <Modal.Body>
            <FormGroup>
              <label>Date:</label>

              <div>
                <Flatpickr value={record.date} options={dateOptions} onChange={this.onDateChange} />
              </div>
            </FormGroup>

            <NumberInput
              name="cost"
              label="Cost"
              value={record.cost}
              onChange={this.props.onChange}
              error={errors.cost}
            />

            <SelectInput
              name="categoryId"
              label="Category"
              value={record.categoryId}
              options={categoryOptions}
              onChange={this.props.onChange}
              error={errors.categoryId}
            />

            <TextAreaInput
              name="note"
              label="Note:"
              value={record.note}
              onChange={this.props.onChange}
              placeholder="Note"
              error={errors.note}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={this.save}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SaveRecord;
