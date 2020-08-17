import axios from 'axios';
import React, { useEffect } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { fetchAllNotes as fetchAllNotesAction } from 'actions/notes';
import PropTypes from 'prop-types';

const Details = ({ fetchAllNotes, match, activeItem }) => {
  useEffect(() => {
    const source = axios.CancelToken.source();
    // eslint-disable-next-line no-underscore-dangle
    if (!activeItem[0]._id) {
      fetchAllNotes(match.path.split('/')[1], source);
    }

    return () => {
      source.cancel();
    };
  });

  return (
    <DetailsTemplate
      title={activeItem[0].title}
      createdAt={activeItem[0].createdAt}
      content={activeItem[0].content}
      author={activeItem[0].author}
      articleUrl={activeItem[0].articleUrl}
      twitterName={activeItem[0].twitterName}
      /* eslint-disable-next-line react/prop-types,no-underscore-dangle */
      id={activeItem[0]._id}
    />
  );
};

Details.propTypes = {
  activeItem: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  match: PropTypes.shape({
    path: PropTypes.shape({
      split: PropTypes.string.isRequired,
    }),
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  // pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
};

const mapStateToProps = ({ notes }, { pageContext, match }) => {
  if (notes[pageContext]) {
    return {
      activeItem: notes[pageContext].filter(({ _id: id }) => id === match.params.id),
    };
  }
  return {
    activeItem: [
      {
        _id: '',
        title: 'Undefined',
        createdAt: '139223123',
        author: '',
        twitterName: '',
        articleUrl: '',
        content: '',
      },
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllNotes: (itemType, source) => dispatch(fetchAllNotesAction(itemType, source)),
  };
};

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Details));
