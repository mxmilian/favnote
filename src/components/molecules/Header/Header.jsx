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
  setShared as setSharedAction,
} from 'actions/filters';
import Select from 'components/atoms/Select/Select';
import Radio from 'components/atoms/Radio/Radio';

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
  align-items: center;
  margin: 2rem 0 3.2rem 0;

  @media (max-width: 560px) {
    flex-direction: column;
    max-width: 22rem;
    align-content: center;
  }
`;

const Header = ({ pageContext, items, text, shared, setFilterText, setSortBy, setShared }) => {
  return (
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
        {pageContext !== 'users' && (
          <Radio
            pageContext={pageContext}
            content={`Show friends ${pageContext}`}
            checked={shared}
            setChecked={() => setShared(!shared)}
          />
        )}
      </StyledFilters>
    </>
  );
};

Header.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
  text: PropTypes.string.isRequired,
  shared: PropTypes.bool,
  setFilterText: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  setShared: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
Header.defaultProps = {
  shared: false,
};

const mapStateToProps = ({ filters, notes, users }, { pageContext }) => {
  if (pageContext === 'users')
    return {
      items: getVisibleNotes(users[pageContext], filters, pageContext),
      text: filters.text,
      sortBy: filters.sortBy,
    };

  return {
    items: getVisibleNotes(notes[pageContext], filters, null, users.userID),
    text: filters.text,
    sortBy: filters.sortBy,
    shared: filters.shared,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setFilterText: (text) => dispatch(setTextFilterAction(text)),
  setSortBy: (sortBy) => dispatch(setSortByAction(sortBy)),
  setShared: (shared) => dispatch(setSharedAction(shared)),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Header));
