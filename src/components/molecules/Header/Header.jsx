import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
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

const Header = ({ pageType, notes, text, setFilterText }) => (
  <>
    <StyledHeading big as="h1">
      {pageType}
    </StyledHeading>
    <StyledParagraph>
      {notes.length} {pageType}
    </StyledParagraph>
    <StyledInput search value={text} onChange={(e) => setFilterText(e.target.value)} />
  </>
);

Header.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  text: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = ({ filters, notes }, { pageType }) => ({
  notes: getVisibleNotes(notes[pageType], filters),
  text: filters.text,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterText: (text) => dispatch(setTextFilterAction(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
