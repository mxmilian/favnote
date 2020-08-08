import {
  fetchNotes as fetchNotesAction,
  fetchFriendsNotes as fetchFriendsNotesAction,
} from 'actions/notes';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';

const Twitters = ({ twitters, shared, loading, fetchNotes, fetchFriendsNotes, toggleLoading }) => {
  let fetchAction = fetchNotes;
  if (shared) {
    fetchAction = fetchFriendsNotes;
  }
  useFetchData(fetchAction, twitters, 'twitters', toggleLoading, shared);

  return (
    <GridTemplate loading={loading}>
      {twitters.map(
        ({ _id: id, title, createdAt, author, public: sharedNote, content, twitterName }) => (
          <Card
            id={id}
            key={id}
            title={title}
            createdAt={createdAt}
            author={author}
            shared={sharedNote}
            content={content}
            twitterName={twitterName}
          />
        ),
      )}
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
      public: PropTypes.bool.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
  fetchFriendsNotes: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  shared: PropTypes.bool.isRequired,
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ notes, filters, users }) => ({
  twitters: getVisibleNotes(notes.twitters, filters, null, users.userID),
  shared: filters.shared,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: (pageContext) => dispatch(fetchNotesAction(pageContext)),
  fetchFriendsNotes: (itemType) => dispatch(fetchFriendsNotesAction(itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Twitters));
