import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import withLoader from 'hoc/withLoader';
import { useFetchData } from 'hooks/useFetchData';

const Articles = ({ articles, loading, fetchNotes, toggleLoading }) => {
  useFetchData(fetchNotes, articles, 'articles', toggleLoading);

  return (
    <GridTemplate loading={loading}>
      {articles.map(({ _id: id, title, createdAt, content, articleUrl }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
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
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articles: [],
};

const mapStateToProps = ({ notes, filters }) => ({
  articles: getVisibleNotes(notes.articles, filters),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (itemType) => dispatch(fetchNotesAction(itemType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Articles));
