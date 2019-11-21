import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'components/bootstrap';
import PropTypes from 'prop-types';

import validationHelper from 'helpers/validationHelper';

import TextInput from 'components/common/TextInput';
import TextAreaInput from 'components/common/TextAreaInput';

SaveCategory.propTypes = {
  category: PropTypes.object,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool
};

function SaveCategory({category, save, close, onChange, visible}) {
  const [errors, setErrors] = useState({title: '', description: ''});

  useEffect(() => {
    setErrors({title: '', description: ''});
  }, [category]);

  const formIsValid = () => {
    let formErrors = {
      title: '',
      description: ''
    };

    if (!category.title) {
      formErrors.title = 'Title field is required.';
    }

    if (!category.description) {
      formErrors.description = 'Description field is required.';
    }

    setErrors(formErrors);

    return validationHelper.isEmptyErrorObject(formErrors);
  };

  const onSave = () => {
    if (!formIsValid()) return;
    save();
  };

  if (!category) return null;

  let title = category.id ? 'Edit Category' : 'Add New Category';

  return (
    <Modal show={visible} backdrop="static" onHide={close}>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        <TextInput
          name="title"
          label="Title"
          value={category.title}
          onChange={onChange}
          placeholder="Title"
          error={errors.title}
        />

        <TextAreaInput
          name="description"
          label="Description"
          value={category.description}
          onChange={onChange}
          placeholder="Description"
          error={errors.description}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveCategory;
