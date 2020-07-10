import Heading from 'components/atoms/Heading/Heading';
import React from 'react';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';

const StyledHeading = styled(Heading)`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const UsersTemplate = () => (
  <SidebarTemplate>
    <StyledHeading big as="h1">
      Users
    </StyledHeading>
  </SidebarTemplate>
);

export default UsersTemplate;
