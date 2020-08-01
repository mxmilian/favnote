import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import PageContext from 'context';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/theme';
import HelmetTemplate from 'templates/HelmetTemplate';
import { useCurrentPage } from 'hooks/useCurrentPage';

const MainTemplate = ({ children, location }) => {
  const pageType = useCurrentPage(location);

  return (
    <PageContext.Provider value={pageType}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <HelmetTemplate>{children}</HelmetTemplate>
      </ThemeProvider>
    </PageContext.Provider>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
