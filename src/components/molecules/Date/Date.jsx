import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Moment from 'react-moment';

const StyledDateWrapper = styled.div`
  display: flex;
`;

const StyledDateCreated = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  margin-right: 0.4rem;
`;

const StyledDateParagraph = styled(Moment)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.normal};
`;

const Date = ({ term, createdAt }) => (
  <StyledDateWrapper>
    <StyledDateCreated>{term}:</StyledDateCreated>
    <StyledDateParagraph fromNow>{createdAt}</StyledDateParagraph>
  </StyledDateWrapper>
);

Date.propTypes = {
  term: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Date;
