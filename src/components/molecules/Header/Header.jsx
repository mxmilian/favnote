import withContext from 'hoc/withContext';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import arrowDown from 'assets/arrow-down.svg';
import arrowUp from 'assets/arrow-up.svg';
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
  align-content: center;
  margin: 2rem 0 3rem 0;
`;

const StyledSelect = styled.select`
  margin-left: 2rem;
  background-image: url(${({ value }) => (value === 'asc' ? arrowDown : arrowUp)});
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 5rem;
  padding: 1rem 2rem 1rem 4rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-size: 1.5rem;
  background-position: 1.5rem 50%;
  background-repeat: no-repeat;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.black};
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
      <Input search value={text} onChange={(e) => setFilterText(e.target.value)} />
      <StyledSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </StyledSelect>
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
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
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
