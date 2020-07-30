import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.normal};
`;

const StyledInput = styled.input`
  display: none;

  &:checked ~ span:after {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const StyledSpan = styled.span`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 2px solid ${({ theme, pageContext }) => theme[pageContext]};
  display: block;
  position: relative;
  margin-right: 0.6rem;

  &:after {
    content: '';
    height: 0.8rem;
    width: 0.8rem;
    background-color: ${({ theme, pageContext }) => theme[pageContext]};
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    transition: 300ms ease-in-out 0s;
  }
`;

const Radio = ({ pageContext, checked, setChecked, content }) => (
  <>
    <StyledLabel>
      <StyledInput
        id="sharedRadio"
        type="radio"
        name="sharedRadio"
        checked={checked}
        onClick={setChecked}
        onChange={setChecked}
      />
      <StyledSpan pageContext={pageContext} />
      {content}
    </StyledLabel>
  </>
);

Radio.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Radio;
