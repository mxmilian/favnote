import ButtonPhoto from 'components/atoms/ButtonPhoto/ButtonPhoto';
import Heading from 'components/atoms/Heading/Heading';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div``;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const User = ({ name, photo }) => (
  <StyledWrapper>
    <FormWrapper>
      <ButtonPhoto icon={`http://localhost:1337/static/image/users/${photo}`} />
      <Heading>Hello{name}</Heading>
    </FormWrapper>
  </StyledWrapper>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default User;
