import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, accessToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken) {
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
  accessToken: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

ProtectedRoute.defaultProps = {
  location: {
    pathname: '',
  },
  accessToken: null,
};

const mapStateToProps = ({ users }) => ({
  accessToken: users.accessToken,
});

export default connect(mapStateToProps)(ProtectedRoute);
