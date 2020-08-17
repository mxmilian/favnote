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
    if (!activeItem._id) {
      fetchAllNotes(match.path.split('/')[1], source);
    }

    return () => {
      source.cancel();
    };
  }, []);

  if (Object.keys(activeItem).length === 0) {
    return <div>lol</div>;
  }
  return (
    <DetailsTemplate
      title={activeItem.title}
      createdAt={activeItem.createdAt}
      content={activeItem.content}
      author={activeItem.author}
      articleUrl={activeItem.articleUrl}
      twitterName={activeItem.twitterName}
      /* eslint-disable-next-line react/prop-types,no-underscore-dangle */
      id={activeItem._id}
    />
  );
};

Details.propTypes = {
  activeItem: PropTypes.objectOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  // pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
};

const mapStateToProps = ({ notes }, { pageContext, match }) => {
  if (notes[pageContext]) {
    const item = notes[pageContext].filter(({ _id: id }) => id === match.params.id);
    return {
      activeItem: { ...item[0] },
    };
  }
  return { activeItem: {} };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllNotes: (itemType, source) => dispatch(fetchAllNotesAction(itemType, source)),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Details));
