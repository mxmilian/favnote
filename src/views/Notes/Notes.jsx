import {
  fetchNotes as fetchNotesAction,
  fetchFriendsNotes as fetchFriendsNotesAction,
} from 'actions/notes';
import { fetchUser as fetchUserAction } from 'actions/user';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';
import { useFetchUser } from 'hooks/useFetchUser';

const Notes = ({
  notes,
  shared,
  userID,
  loading,
  fetchNotes,
  fetchFriendsNotes,
  toggleLoading,
  fetchUser,
}) => {
  let fetchAction = fetchNotes;
  if (shared) {
    fetchAction = fetchFriendsNotes;
  }
  useFetchUser(fetchUser, userID);
  useFetchData(fetchAction, notes, 'notes', toggleLoading, shared);
  return (
    <GridTemplate loading={loading}>
      {notes.map(({ _id: id, title, createdAt, author, content }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
          author={author}
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
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
  fetchFriendsNotes: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  shared: PropTypes.bool.isRequired,
  userID: PropTypes.string,
};

Notes.defaultProps = {
  notes: [],
  userID: '',
};

const mapStateToProps = ({ notes, filters, users }) => ({
  notes: getVisibleNotes(notes.notes, filters, null, users.userID),
  shared: filters.shared,
  userID: users.userID,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (itemType) => dispatch(fetchNotesAction(itemType)),
    fetchFriendsNotes: (itemType) => dispatch(fetchFriendsNotesAction(itemType)),
    fetchUser: () => dispatch(fetchUserAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Notes));
