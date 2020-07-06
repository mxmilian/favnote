import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

class Articles extends Component {
  componentDidMount() {
    const {
      props: { fetchNotes },
    } = this;
    fetchNotes('notes');
  }

  render() {
    const { articles } = this.props;
    return (
      <GridTemplate>
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
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
