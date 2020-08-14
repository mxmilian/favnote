import {
  fetchFriendsNotes as fetchFriendsNotesAction,
  fetchNotes as fetchNotesAction,
} from 'actions/notes';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { useFetchData } from 'hooks/useFetchData';

const Articles = ({ articles, fetchFriendsNotes }) => {
  const loading = useFetchData(articles, fetchFriendsNotes, 'articles');

  return (
    <GridTemplate loading={loading}>
      {articles.map(
        ({ _id: id, title, createdAt, author, content, public: sharedNote, articleUrl }) => (
          <Card
            id={id}
            key={id}
            title={title}
            createdAt={createdAt}
            author={author}
            shared={sharedNote}
            content={content}
            articleUrl={articleUrl}
          />
        ),
      )}
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
      public: PropTypes.bool.isRequired,
    }),
  ),
  fetchFriendsNotes: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articles: [],
};

const mapStateToProps = ({ notes, filters, users }) => ({
  articles: getVisibleNotes(notes.articles, filters, null, users.userID),
  shared: filters.shared,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (itemType, source) => dispatch(fetchNotesAction(itemType, source)),
    fetchFriendsNotes: (itemType, source) => dispatch(fetchFriendsNotesAction(itemType, source)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
