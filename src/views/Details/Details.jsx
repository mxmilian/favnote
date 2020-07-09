import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

class Details extends Component {
  state = {
    activeItem: {
      title: '',
      createdAt: '2020-01-01T01:01:01',
      content: '',
      articleUrl: '',
      twitterName: '',
    },
  };

  componentDidMount() {
    const { activeItem } = this.props;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    if (activeItem) {
      const [item] = activeItem;
      this.setState({ activeItem: item });
    } else {
      axios
        .get(`/api/v1/notes/${id}`)
        .then(({ data }) => this.setState({ activeItem: data.data.readDoc }))
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <DetailsTemplate
        title={activeItem.title}
        createdAt={activeItem.createdAt}
        content={activeItem.content}
        articleUrl={activeItem.articleUrl}
        twitterName={activeItem.twitterName}
      />
    );
  }
}

Details.propTypes = {
  activeItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      createdAt: PropTypes.string,
      twitterName: PropTypes.string,
      articleUrl: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

Details.defaultProps = {
  activeItem: null,
};

const mapStateToProps = ({ notes }, { pageContext, match }) => {
  if (notes[pageContext]) {
    return {
      activeItem: notes[pageContext].filter(({ _id: id }) => id === match.params.id),
    };
  }
  return {};
};
export default withContext(connect(mapStateToProps)(Details));
