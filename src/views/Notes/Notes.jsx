import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import withLoader from 'hoc/withLoader';

class Notes extends Component {
  componentDidMount() {
    const {
      props: { fetchNotes, toggleLoading },
    } = this;
    const { notes } = this.props;
    if (notes.length === 0) {
      toggleLoading();
      fetchNotes('notes').then(() => toggleLoading());
    }
  }

  render() {
    const { notes, loading } = this.props;
    return (
      <GridTemplate loading={loading}>
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
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Notes));
