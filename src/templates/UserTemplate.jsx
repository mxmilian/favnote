import Heading from 'components/atoms/Heading/Heading';
import User from 'components/organisms/User/User';
import React from 'react';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  position: relative;
  max-width: 70rem;
`;

const UserTemplate = ({ user }) => (
  <SidebarTemplate>
    <StyledWrapper>
      <Heading big>Hello</Heading>
      <User name={user.name} photo={user.photo} />
    </StyledWrapper>
  </SidebarTemplate>
);

UserTemplate.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserTemplate;
