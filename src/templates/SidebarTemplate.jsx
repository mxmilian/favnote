import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding: 2.5rem 5rem 2.5rem 20rem;
`;

const SidebarTemplate = ({ children, pageType }) => (
  <StyledWrapper>
    <Sidebar pageType={pageType} />
    {children}
  </StyledWrapper>
);

SidebarTemplate.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]).isRequired,
};

export default SidebarTemplate;
