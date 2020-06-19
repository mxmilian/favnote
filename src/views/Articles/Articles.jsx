import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Card from 'components/molecules/Card/Card';
import { articles } from 'data/dummyData';

const Articles = () => (
  <UserPageTemplate pageType="article">
    <>
      {articles.map(({ title, created, content, articleUrl }) => (
        <Card
          cardType="article"
          key={title}
          title={title}
          created={created}
          content={content}
          articleUrl={articleUrl}
        />
      ))}
    </>
  </UserPageTemplate>
);

export default Articles;
