import React from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import { articles } from 'data/dummyData';

const Details = () => (
  <DetailsTemplate
    title={articles[0].title}
    created={articles[0].created}
    content={articles[0].content}
    articleUrl={articles[0].articleUrl}
    twitterName="https://i.kym-cdn.com/entries/icons/facebook/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg"
  />
);

export default Details;
