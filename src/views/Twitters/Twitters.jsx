import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';

class Twitters extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNotes();
  }

  render() {
    const { twitters } = this.props;
    return (
      <GridTemplate>
        {twitters.map(({ _id: id, title, created, content, twitterName }) => (
          <Card
            id={id}
            key={id}
            title={title}
            created={created}
            content={content}
            twitterName={twitterName}
          />
        ))}
      </GridTemplate>
    );
  }
}

Twitters.propTypes = {
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ notes, filters }) => ({
  twitters: getVisibleNotes(notes.twitters, filters),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotesAction('twitters')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
