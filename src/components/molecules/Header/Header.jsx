import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { setTextFilter as setTextFilterAction } from 'actions/filters';

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

const Header = ({ pageType, text, setFilterText }) => (
  <>
    <StyledHeading big as="h1">
      {pageType}
    </StyledHeading>
    <StyledParagraph>6 {pageType}</StyledParagraph>
    <StyledInput search value={text} onChange={(e) => setFilterText(e.target.value)} />
  </>
);

Header.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  text: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
};

const mapStateToProps = ({ filters }) => ({
  text: filters.text,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterText: (text) => dispatch(setTextFilterAction(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
