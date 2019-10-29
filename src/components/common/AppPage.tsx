import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import {getCurrentUser} from 'actions/userActions';

import Navigation from 'components/Navigation';

AppPage.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string
};

function AppPage(props) {
  let dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.current);

  useEffect(() => {
    if (!isAuthenticated()) dispatch(getCurrentUser());
  });

  const isAuthenticated = () => {
    if (props.public) return true;
    return !_.isEmpty(user);
  };

  const getTitle = () => {
    return props.title ? `Expense Manager - ${props.title}` : 'Expense Manager';
  };

  const isReady = () => {
    return isAuthenticated();
  };

  if (!isReady()) return null;

  let title = getTitle();

  return (
    <div>
      <Helmet title={title} />

      {!props.public && <Navigation />}

      {props.children}
    </div>
  );
}

export default AppPage;
