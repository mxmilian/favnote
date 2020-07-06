import React from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import { notes } from 'data/dummyData';

const Details = () => (
  <DetailsTemplate
    title={notes[0].title}
    createdAt={notes[0].createdAt}
    content={notes[0].content}
    articleUrl={notes[0].articleUrl}
    twitterName="https://i.kym-cdn.com/entries/icons/facebook/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg"
  />
);

export default Details;
