import React from 'react';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding: 2.5rem 5rem 2.5rem 20rem;
  @media (max-width: 880px) {
    padding: 2.5rem 5rem 12.5rem 5rem;
  }
  @media (max-width: 375px) {
    padding: 2.5rem 2.5rem 12.5rem 2.5rem;
  }
`;

const SidebarTemplate = ({ children }) => (
  <StyledWrapper>
    <Sidebar />
    {children}
  </StyledWrapper>
);

SidebarTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
};

export default withContext(SidebarTemplate);
