import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import PropTypes from 'prop-types';
import UserContext from 'context/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.userID) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: routes.sign,
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

ProtectedRoute.defaultProps = {
  location: {
    pathname: '',
  },
};

export default ProtectedRoute;
