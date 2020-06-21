import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { articles } from 'data/dummyData';

const Articles = () => (
  <GridTemplate pageType="articles">
    {articles.map(({ title, created, content, articleUrl }) => (
      <Card
        cardType="articles"
        key={title}
        title={title}
        created={created}
        content={content}
        articleUrl={articleUrl}
      />
    ))}
  </GridTemplate>
);

export default Articles;
