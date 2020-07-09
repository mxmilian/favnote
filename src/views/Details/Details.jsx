import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';

class Details extends Component {
  componentDidMount() {}

  render() {
    const { activeItem } = this.props;
    const [item] = activeItem;
    return (
      <DetailsTemplate
        title={item.title}
        createdAt={item.createdAt}
        content={item.content}
        articleUrl={item.articleUrl}
        twitterName="https://i.kym-cdn.com/entries/icons/facebook/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg"
      />
    );
  }
}

Details.propTypes = {
  activeItem: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = ({ notes }, { pageContext, match }) => ({
  activeItem: notes[pageContext].filter(({ _id: id }) => id === match.params.id),
});

export default withContext(connect(mapStateToProps)(Details));
