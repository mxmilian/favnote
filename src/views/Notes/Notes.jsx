import {
  fetchNotes as fetchNotesAction,
  fetchFriendsNotes as fetchFriendsNotesAction,
} from 'actions/notes';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';

const Notes = ({ notes, shared, loading, fetchNotes, fetchFriendsNotes, toggleLoading }) => {
  let fetchAction = fetchNotes;
  if (shared) {
    fetchAction = fetchFriendsNotes;
  }
  useFetchData(fetchAction, notes, 'notes', toggleLoading, shared);
  return (
    <GridTemplate loading={loading}>
      {notes.map(({ _id: id, title, createdAt, author, public: sharedNote, content }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
          author={author}
          shared={sharedNote}
          content={content}
        />
      ))}
    </GridTemplate>
  );
};
Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      public: PropTypes.bool.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
  fetchFriendsNotes: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  shared: PropTypes.bool.isRequired,
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes, filters, users }) => ({
  notes: getVisibleNotes(notes.notes, filters, null, users.userID),
  shared: filters.shared,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (itemType) => dispatch(fetchNotesAction(itemType)),
    fetchFriendsNotes: (itemType) => dispatch(fetchFriendsNotesAction(itemType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Notes));
