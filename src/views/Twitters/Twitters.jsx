import Card from 'components/molecules/Card/Card';
import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import { twitters } from 'data/dummyData';

const Twitters = () => (
  <GridTemplate pageType="twitters">
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

export default Twitters;
