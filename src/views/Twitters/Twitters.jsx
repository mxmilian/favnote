import {
  fetchNotes as fetchNotesAction,
  fetchFriendsNotes as fetchFriendsNotesAction,
} from 'actions/notes';
import { fetchUser as fetchUserAction } from 'actions/user';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';
import { useFetchUser } from 'hooks/useFetchUser';

const Twitters = ({
  twitters,
  shared,
  userID,
  loading,
  fetchNotes,
  fetchFriendsNotes,
  fetchUser,
  toggleLoading,
}) => {
  let fetchAction = fetchNotes;
  if (shared) {
    fetchAction = fetchFriendsNotes;
  }
  useFetchUser(fetchUser, userID);
  useFetchData(fetchAction, twitters, 'twitters', toggleLoading, shared);

  return (
    <GridTemplate loading={loading}>
      {twitters.map(({ _id: id, title, createdAt, author, content, twitterName }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
          author={author}
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
  fetchFriendsNotes: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  shared: PropTypes.bool.isRequired,
  userID: PropTypes.string,
};

Twitters.defaultProps = {
  twitters: [],
  userID: '',
};

const mapStateToProps = ({ notes, filters, users }) => ({
  twitters: getVisibleNotes(notes.twitters, filters, null, users.userID),
  shared: filters.shared,
  userID: users.userID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: (pageContext) => dispatch(fetchNotesAction(pageContext)),
  fetchFriendsNotes: (itemType) => dispatch(fetchFriendsNotesAction(itemType)),
  fetchUser: () => dispatch(fetchUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Twitters));
