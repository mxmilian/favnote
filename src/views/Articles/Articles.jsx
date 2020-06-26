import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

const Articles = ({ articles }) => (
  <GridTemplate>
    {articles.map(({ id, title, created, content, articleUrl }) => (
      <Card
        id={id}
        key={id}
        title={title}
        created={created}
        content={content}
        articleUrl={articleUrl}
      />
    ))}
  </GridTemplate>
);

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      articleUrl: PropTypes.string.isRequired,
    }),
  ),
};

Articles.defaultProps = {
  articles: [],
};

const mapStateToProps = ({ notes, filters }) => ({
  articles: getVisibleNotes(notes.articles, filters),
});

export default connect(mapStateToProps)(Articles);
