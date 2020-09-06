import Heading from 'components/atoms/Heading/Heading';
import React from 'react';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  position: relative;
  padding: 3.5rem 0;
  max-width: 70rem;
`;

const UserTemplate = ({ id }) => (
  <SidebarTemplate>
    <StyledWrapper>
      <Heading big>{id}</Heading>
    </StyledWrapper>
  </SidebarTemplate>
);

UserTemplate.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserTemplate;
