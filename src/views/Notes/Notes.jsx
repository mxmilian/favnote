import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

class Notes extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      props: { fetchNotes },
    } = this;
    const { notes } = this.props;
    if (notes.length === 0) {
      // setTimeout is to present loader :P
      // setTimeout(() => {
      //   fetchNotes('notes').then(this.setState({ loading: false }));
      // }, 1000);
      fetchNotes('notes').then(() => this.setState({ loading: false }));
    } else this.setState({ loading: false });
  }

  render() {
    const { notes } = this.props;
    const { loading } = this.state;
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
