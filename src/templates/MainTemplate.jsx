import { fetchUser as fetchUserAction } from 'actions/user';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import PageContext from 'context/PageContext';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/theme';
import HelmetTemplate from 'templates/HelmetTemplate';
import { useCurrentPage } from 'hooks/useCurrentPage';
import { connect } from 'react-redux';
import { useFetchUser } from 'hooks/useFetchUser';
import UserContext from 'context/UserContext';
import { HelmetProvider } from 'react-helmet-async';

const MainTemplate = ({ children, location, user, fetchUser }) => {
  const pageType = useCurrentPage(location);
  useFetchUser(fetchUser, user);
  console.log(user);
  return (
    <HelmetProvider>
      <PageContext.Provider value={pageType}>
        <UserContext.Provider value={user}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <HelmetTemplate>{children}</HelmetTemplate>
          </ThemeProvider>
        </UserContext.Provider>
      </PageContext.Provider>
    </HelmetProvider>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userID: PropTypes.string,
    name: PropTypes.string,
  }),
};

MainTemplate.defaultProps = {
  user: {
    userID: '',
    name: '',
  },
};

const mapStateToProps = ({ users }) => ({
  user: users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (source) => dispatch(fetchUserAction(source)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainTemplate));
