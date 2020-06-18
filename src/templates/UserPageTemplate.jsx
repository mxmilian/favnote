import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding-left: 15rem;
`;

const UserPageTemplate = ({ children, pageType }) => {
  return (
    <StyledWrapper>
      <Sidebar pageType={pageType} />
      {children}
    </StyledWrapper>
  );
};

UserPageTemplate.propTypes = {
  pageType: PropTypes.oneOf(['note', 'twitter', 'article']).isRequired,
  children: PropTypes.element.isRequired,
};

export default UserPageTemplate;
