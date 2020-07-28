import React, { useEffect } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { fetchNotes as fetchNotesAction } from 'actions/notes';
import PropTypes from 'prop-types';

const Details = ({ fetchNotes, match, activeItem }) => {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (!activeItem[0]._id) {
      fetchNotes(match.path.split('/')[1]);
    }
  });

  return (
    <DetailsTemplate
      title={activeItem[0].title}
      createdAt={activeItem[0].createdAt}
      content={activeItem[0].content}
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
      twitterName: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  match: PropTypes.shape({
    path: PropTypes.shape({
      split: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
    }),
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  fetchNotes: PropTypes.func.isRequired,
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
        twitterName: '',
        articleUrl: '',
        content: '',
      },
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (pageType) => dispatch(fetchNotesAction(pageType)),
  };
};

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Details));
