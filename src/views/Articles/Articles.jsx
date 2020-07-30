import {
  fetchFriendsNotes as fetchFriendsNotesAction,
  fetchNotes as fetchNotesAction,
} from 'actions/notes';
import { fetchUser as fetchUserAction } from 'actions/user';
import { useFetchUser } from 'hooks/useFetchUser';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';

const Articles = ({
  articles,
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
  useFetchData(fetchAction, articles, 'articles', toggleLoading, shared);

  return (
    <GridTemplate loading={loading}>
      {articles.map(({ _id: id, title, createdAt, author, content, articleUrl }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
          author={author}
          content={content}
          articleUrl={articleUrl}
        />
      ))}
    </GridTemplate>
  );
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
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

Articles.defaultProps = {
  articles: [],
  userID: '',
};

const mapStateToProps = ({ notes, filters, users }) => ({
  articles: getVisibleNotes(notes.articles, filters, null, users.userID),
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

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Articles));
