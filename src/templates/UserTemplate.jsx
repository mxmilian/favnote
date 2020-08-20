import Heading from 'components/atoms/Heading/Heading';
import React from 'react';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';

const StyledWrapper = styled.div`
  position: relative;
  padding: 3.5rem 0;
  max-width: 70rem;
`;

const UserTemplate = () => (
  <SidebarTemplate>
    <StyledWrapper>
      <Heading big>Hello username!</Heading>
    </StyledWrapper>
  </SidebarTemplate>
);

export default UserTemplate;
