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
import { useFetchData } from 'hooks/useFetchData';

const Notes = ({ notes, fetchFriendsNotes }) => {
  const loading = useFetchData(notes, fetchFriendsNotes, 'notes');

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
  fetchFriendsNotes: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes, filters, users }) => ({
  notes: getVisibleNotes(notes.notes, filters, null, users.userID),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (itemType, source) => dispatch(fetchNotesAction(itemType, source)),
    fetchFriendsNotes: (itemType, source) => dispatch(fetchFriendsNotesAction(itemType, source)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
