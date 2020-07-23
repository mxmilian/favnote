import React from 'react';
import withContext from 'hoc/withContext';
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
import Select from 'components/atoms/Select/Select';

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
  margin: 2rem 0 3.2rem 0;

  @media (max-width: 560px) {
    flex-direction: column;
    max-width: 22rem;
    align-content: center;
  }
`;

const Header = ({ pageContext, items, text, setFilterText, setSortBy }) => (
  <>
    <StyledHeading big as="h1">
      {pageContext}
    </StyledHeading>
    <StyledParagraph>
      {items.length} {pageContext}
    </StyledParagraph>
    <StyledFilters>
      <Input search value={text} onChange={(e) => setFilterText(e.target.value)} />
      <Select
        items={[
          { name: 'Ascending', value: 'asc' },
          { name: 'Descending', value: 'desc' },
        ]}
        setSortBy={setSortBy}
      />
      {/* <StyledSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}> */}
      {/*  <option value="asc">Ascending</option> */}
      {/*  <option value="desc">Descending</option> */}
      {/* </StyledSelect> */}
    </StyledFilters>
  </>
);

Header.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
  text: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = ({ filters, notes, users }, { pageContext }) => {
  if (pageContext === 'users')
    return {
      items: getVisibleNotes(users[pageContext], filters, pageContext),
      text: filters.text,
      sortBy: filters.sortBy,
    };

  return {
    items: getVisibleNotes(notes[pageContext], filters),
    text: filters.text,
    sortBy: filters.sortBy,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setFilterText: (text) => dispatch(setTextFilterAction(text)),
  setSortBy: (sortBy) => dispatch(setSortByAction(sortBy)),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Header));
