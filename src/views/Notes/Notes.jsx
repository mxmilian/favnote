import { fetchAllNotes as fetchAllNotesAction } from 'actions/notes';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { useFetchData } from 'hooks/useFetchData';
import { NOTES } from 'utils/constants';

const Notes = ({ notes, fetchAllNotes }) => {
  const loading = useFetchData(notes, fetchAllNotes, NOTES);
  return (
    <GridTemplate loading={loading}>
      {notes.map(({ _id: id, title, createdAt, author, public: sharedNote, content }) => (
        <Card
          id={id}
          key={id}
          title={title}
          createdAt={createdAt}
          author={author}
          shared={sharedNote}
          content={content}
        />
      ))}
    </GridTemplate>
  );
};
Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      public: PropTypes.bool.isRequired,
    }),
  ),
  fetchAllNotes: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes, filters, users }) => {
  return {
    // eslint-disable-next-line no-underscore-dangle
    notes: getVisibleNotes(notes.notes, filters, null, users.user._id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllNotes: (itemType, source) => dispatch(fetchAllNotesAction(itemType, source)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
