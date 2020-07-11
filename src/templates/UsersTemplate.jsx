import Header from 'components/molecules/Header/Header';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';
import { theme as themeLoader } from 'theme/theme';

const StyledLoaderEmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
`;

const UsersTemplate = ({ children, loading, pageType }) => (
  <SidebarTemplate>
    <Header />
    {loading ? (
      <StyledLoaderEmptyWrapper>
        <Loader type="Grid" color={themeLoader[pageType]} height={250} width={250} />
      </StyledLoaderEmptyWrapper>
    ) : (
      children
    )}
  </SidebarTemplate>
);

UsersTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default UsersTemplate;
