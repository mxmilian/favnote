import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import getVisibleNotes from 'selector';
import GridTemplate from 'templates/GridTemplate';

const Twitters = ({ twitters }) => (
  <GridTemplate>
    {twitters.map(({ id, title, created, content, twitterName }) => (
      <Card
        cardType="twitters"
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

Twitters.propTypes = {
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ notes, filters }) => ({
  twitters: getVisibleNotes(notes.twitters, filters),
});

export default connect(mapStateToProps)(Twitters);
