import Paragraph from 'components/atoms/Paragraph/Paragraph';
import React, { useState } from 'react';
import styled from 'styled-components';
import closeIcon from 'assets/close.svg';
import PropTypes from 'prop-types';

const ErrorWrapper = styled.div`
  width: 70%;
  height: 4rem;
  background-color: ${({ theme }) => theme.errorBackground};
  border: 1px solid rgba(158, 28, 35, 0.2);
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.black};
`;

const StyledButton = styled.button`
  display: block;
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 2rem;
  border: none;
  background: url(${({ icon }) => icon}) no-repeat 50% 50%;
  background-size: 50% 50%;
  cursor: pointer;
`;

const Error = ({ failure }) => {
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <ErrorWrapper>
        <StyledParagraph>{failure}</StyledParagraph>
        <StyledButton icon={closeIcon} onClick={() => setVisible((prevState) => !prevState)} />
      </ErrorWrapper>
    );
  }
  return null;
};

Error.propTypes = {
  failure: PropTypes.string.isRequired,
};

export default Error;
