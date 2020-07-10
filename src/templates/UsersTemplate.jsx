import Heading from 'components/atoms/Heading/Heading';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';

const StyledHeading = styled(Heading)`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const UsersTemplate = ({ pageContext }) => (
  <SidebarTemplate>
    <StyledHeading big as="h1">
      {pageContext}
    </StyledHeading>
  </SidebarTemplate>
);

UsersTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
};

export default withContext(UsersTemplate);
