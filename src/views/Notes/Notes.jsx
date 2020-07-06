import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

class Notes extends Component {
  componentDidMount() {
    const {
      props: { fetchNotes },
    } = this;
    fetchNotes('notes');
  }

  render() {
    const { notes } = this.props;
    return (
      <GridTemplate>
        {notes.map(({ _id: id, title, createdAt, content }) => (
          <Card id={id} key={id} title={title} createdAt={createdAt} content={content} />
        ))}
      </GridTemplate>
    );
  }
}
Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes, filters }) => ({
  notes: getVisibleNotes(notes.notes, filters),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (itemType) => dispatch(fetchNotesAction(itemType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
