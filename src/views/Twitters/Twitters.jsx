import { fetchNotes as fetchNotesAction } from 'actions/notes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';

class Twitters extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      props: { fetchNotes },
    } = this;
    fetchNotes('twitters').then(this.setState({ loading: false }));
  }

  render() {
    const { twitters } = this.props;
    const { loading } = this.state;
    return (
      <GridTemplate loading={loading}>
        {twitters.map(({ _id: id, title, createdAt, content, twitterName }) => (
          <Card
            id={id}
            key={id}
            title={title}
            createdAt={createdAt}
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
      createdAt: PropTypes.string.isRequired,
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (pageContext) => dispatch(fetchNotesAction(pageContext)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
