import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import PageContext from 'context';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/theme';
import HelmetTemplate from 'templates/HelmetTemplate';

class MainTemplate extends Component {
  state = {
    pageType: 'notes',
  };

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  setCurrentPage = (prevState = '') => {
    const {
      location: { pathname },
    } = this.props;
    const pageTypes = ['notes', 'twitters', 'articles', 'users'];
    const [currentPage] = pageTypes.filter((el) => pathname.includes(el));
    if (prevState.pageType !== currentPage && currentPage !== undefined)
      this.setState({ pageType: currentPage });
  };

  render() {
    const { pageType } = this.state;
    const { children } = this.props;
    console.log(pageType);
    return (
      <PageContext.Provider value={pageType}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <HelmetTemplate>{children}</HelmetTemplate>
        </ThemeProvider>
      </PageContext.Provider>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
