import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import Header from 'components/molecules/Header/Header';

const StyledWrapper = styled.div`
  padding: 2.5rem 8.5rem 2.5rem 23.5rem;
`;

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8.5rem;
`;

const StyledPageHeader = styled.div``;

const UserPageTemplate = ({ children, pageType }) => (
  <StyledWrapper>
    <Sidebar pageType={pageType} />
    <StyledPageHeader>
      <Header pageType={pageType} />
    </StyledPageHeader>
    <StyledGridWrapper>{children}</StyledGridWrapper>
  </StyledWrapper>
);

UserPageTemplate.propTypes = {
  pageType: PropTypes.oneOf(['note', 'twitter', 'article']).isRequired,
  children: PropTypes.element.isRequired,
};

export default UserPageTemplate;
