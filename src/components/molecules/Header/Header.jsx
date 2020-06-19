import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledHeading = styled(Heading)`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.grey500};
`;

const StyledInput = styled(Input)`
  margin: 2rem 0;
`;

const Header = ({ pageType }) => (
  <>
    <StyledHeading big as="h1">
      {pageType}s
    </StyledHeading>
    <StyledParagraph>6 {pageType}s</StyledParagraph>
    <StyledInput search />
  </>
);

Header.propTypes = {
  pageType: PropTypes.oneOf(['note', 'twitter', 'article']).isRequired,
};

export default Header;
