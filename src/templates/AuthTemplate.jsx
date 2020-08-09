import Heading from 'components/atoms/Heading/Heading';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logoImg from 'assets/logo.svg';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.notes};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 20rem;
  height: auto;
  margin-bottom: 1rem;
`;

const StyledAuthCard = styled.div`
  margin-top: 2rem;
  min-width: 40rem;
  min-height: 40rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled(Heading)`
  text-align: center;
`;

const AuthTemplate = ({ children }) => (
  <StyledWrapper>
    <StyledLogo src={logoImg} alt="Logo favnote" />
    <StyledHeading>Your new favorite online notes experience!</StyledHeading>
    <StyledAuthCard>{children}</StyledAuthCard>
  </StyledWrapper>
);

AuthTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default AuthTemplate;
