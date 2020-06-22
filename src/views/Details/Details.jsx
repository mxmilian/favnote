import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailsTemplate from 'templates/DetailsTemplate';
import { routes } from 'routes';
import { articles } from 'data/dummyData';

class Details extends Component {
  state = {
    pageType: 'notes',
  };

  componentDidMount() {
    const { props } = this;
    const { path } = props.match;
    switch (path) {
      case routes.notesDetails:
        this.setState({ pageType: 'notes' });
        break;
      case routes.articlesDetails:
        this.setState({ pageType: 'articles' });
        break;
      case routes.twittersDetails:
        this.setState({ pageType: 'twitters' });
        break;
      default:
        this.setState({ pageType: 'notes' });
    }
  }

  render() {
    const { pageType } = this.state;
    return (
      <DetailsTemplate
        pageType={pageType}
        title={articles[0].title}
        created={articles[0].created}
        content={articles[0].content}
        articleUrl={articles[0].articleUrl}
        twitterName="https://i.kym-cdn.com/entries/icons/facebook/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg"
      />
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Details;
