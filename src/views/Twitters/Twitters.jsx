import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import { useFetchData } from 'hooks/useFetchData';
import { fetchAllNotes as fetchAllNotesAction } from 'actions/notes';
import { TWITTERS } from 'utils/constants';

const Twitters = ({ twitters, fetchAllNotes }) => {
  const loading = useFetchData(twitters, fetchAllNotes, TWITTERS);

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
  fetchAllNotes: PropTypes.func.isRequired,
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ notes, filters, users }) => ({
  // eslint-disable-next-line no-underscore-dangle
  twitters: getVisibleNotes(notes.twitters, filters, null, users.user._id),
  shared: filters.shared,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllNotes: (itemType, source) => dispatch(fetchAllNotesAction(itemType, source)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
