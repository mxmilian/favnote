import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding: 2.5rem 5rem 2.5rem 20rem;
  @media (max-width: 840px) {
    padding: 2.5rem 5rem 12.5rem 5rem;
  }
  @media (max-width: 375px) {
    padding: 2.5rem 2.5rem 12.5rem 2.5rem;
  }
`;

const SidebarTemplate = ({ children, pageType }) => (
  <StyledWrapper>
    <Sidebar pageType={pageType} />
    {children}
  </StyledWrapper>
);

SidebarTemplate.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
};

export default SidebarTemplate;
