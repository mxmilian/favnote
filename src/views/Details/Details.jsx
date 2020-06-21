import Button from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import { routes } from 'routes';

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
      <DetailsTemplate pageType={pageType}>
        <h1>Notes</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur doloremque
          exercitationem illum labore maxime minima perferendis reprehenderit saepe, ullam vel.
          Consectetur debitis distinctio et exercitationem magnam quibusdam quo recusandae veniam.
        </p>
        <Button color={pageType}>close</Button>
      </DetailsTemplate>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Details;
