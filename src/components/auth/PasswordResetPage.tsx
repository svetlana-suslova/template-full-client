import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from '../bootstrap';

import {resetPassword, checkResetToken} from '../../actions/userActions';

import validationHelper from '../../helpers/validationHelper';
import uiHelper from '../../helpers/uiHelper';

import TextInput from '../common/TextInput';

function PasswordResetPage(props) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({email: '', password: '', confirmPassword: '', token: ''});

  const [errors, setErrors] = useState({email: '', password: '', confirmPassword: ''});

  useEffect(() => {
    onCheckResetToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCheckResetToken = async () => {
    let token = props.match.params.token;

    let data: any = await dispatch(checkResetToken(token));

    if (data) setUserData({email: data.email, token: data.token, password: '', confirmPassword: ''});
  };

  const onChange = (field: string, value) => {
    let user = {...userData};

    user[field] = value;

    setUserData(user);
  };

  const resetFormIsValid = () => {
    let errors: any = {};

    if (!userData.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(userData.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!userData.password) {
      errors.password = 'Password field is required.';
    }

    if (!userData.confirmPassword) {
      errors.confirmPassword = 'Please confirm the password.';
    }

    if (userData.password && userData.confirmPassword && userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Wrong password.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onResetPassword = async () => {
    if (!resetFormIsValid()) return;

    let response: any = await dispatch(resetPassword(userData));

    if (response && response.message) {
      uiHelper.showMessage(response.message);

      props.history.push('/login');
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1>Reset Password</h1>

          <TextInput
            name="email"
            label="Email"
            type="email"
            disabled={true}
            value={userData.email}
            onChange={onChange}
            placeholder="Email"
            error={errors.email}
          />

          <TextInput
            name="password"
            label="New Password"
            type="password"
            value={userData.password}
            onChange={onChange}
            placeholder="New password"
            error={errors.password}
          />

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={userData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
          />

          <Button variant="warning" size="lg" onClick={onResetPassword}>
            Save Password
          </Button>

          <hr />

          <p>
            Redirect to login page: <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordResetPage;