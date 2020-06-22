import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import SidebarTemplate from 'templates/SidebarTemplate';

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8.5rem;

  @media (max-width: 1500px) {
    grid-gap: 4.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPageHeader = styled.div``;

const GridTemplate = ({ children, pageType }) => (
  <SidebarTemplate pageType={pageType}>
    <StyledPageHeader>
      <Header pageType={pageType} />
    </StyledPageHeader>
    <StyledGridWrapper>{children}</StyledGridWrapper>
  </SidebarTemplate>
);

GridTemplate.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GridTemplate;
