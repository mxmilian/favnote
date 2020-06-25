import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 35vw;
  z-index: 1;
  background-color: white;
  box-shadow: -0.5rem 0 -1.5rem hsla(0, 0%, 0%, 0.1);
  border-left: 1rem solid ${({ theme, activeColor }) => theme[activeColor]};
  padding: 10rem 9rem;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-top: 3rem;
`;

const StyledTextArea = styled(Input)`
  margin: 3rem 0 5rem;
  border-radius: 2rem;
  height: 30vh;
`;

const FormBar = ({ pageContext }) => {
  return (
    <StyledWrapper activeColor={pageContext}>
      <Heading big>Add new {pageContext.slice(0, -1)}</Heading>
      {pageContext === 'notes' || pageContext === 'articles' ? (
        <StyledInput placeholder="title" />
      ) : null}
      {pageContext === 'twitters' ? <StyledInput placeholder="account name" /> : null}
      {pageContext === 'articles' ? <StyledInput placeholder="article url" /> : null}
      <StyledTextArea as="textarea" placeholder="description" />
      <Button activecolor={pageContext}>Add {pageContext.slice(0, -1)}</Button>
    </StyledWrapper>
  );
};

FormBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
};

export default withContext(FormBar);
