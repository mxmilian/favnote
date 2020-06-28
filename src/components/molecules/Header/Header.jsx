import withContext from 'hoc/withContext';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import {
  setTextFilter as setTextFilterAction,
  setSortBy as setSortByAction,
} from 'actions/filters';

const StyledHeading = styled(Heading)`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.grey500};
`;

const StyledFilters = styled.div`
  display: flex;
`;

const StyledInput = styled(Input)`
  margin: 2rem 0;
`;

const Header = ({ pageContext, notes, text, sortBy, setFilterText, setSortBy }) => (
  <>
    <StyledHeading big as="h1">
      {pageContext}
    </StyledHeading>
    <StyledParagraph>
      {notes.length} {pageContext}
    </StyledParagraph>
    <StyledFilters>
      <StyledInput search value={text} onChange={(e) => setFilterText(e.target.value)} />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </StyledFilters>
  </>
);

Header.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  text: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = ({ filters, notes }, { pageContext }) => ({
  notes: getVisibleNotes(notes[pageContext], filters),
  text: filters.text,
  sortBy: filters.sortBy,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterText: (text) => dispatch(setTextFilterAction(text)),
  setSortBy: (sortBy) => dispatch(setSortByAction(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withContext(Header));
