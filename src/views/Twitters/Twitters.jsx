import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';

const Twitters = ({ twitters, loading, fetchNotes, toggleLoading }) => {
  useFetchData(fetchNotes, twitters, 'twitters', toggleLoading);

  return (
    <GridTemplate loading={loading}>
      {twitters.map(({ _id: id, title, createdAt, content, twitterName }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
          content={content}
          twitterName={twitterName}
        />
      ))}
    </GridTemplate>
  );
};

Twitters.propTypes = {
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ notes, filters }) => ({
  twitters: getVisibleNotes(notes.twitters, filters),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: (pageContext) => dispatch(fetchNotesAction(pageContext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Twitters));
