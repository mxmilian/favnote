import Card from 'components/molecules/Card/Card';
import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import { twitters } from 'data/dummyData';

const Twitters = () => (
  <UserPageTemplate pageType="twitter">
    <>
      {twitters.map(({ title, created, content, twitterName }) => (
        <Card
          cardType="twitter"
          key={title}
          title={title}
          created={created}
          content={content}
          twitterName={twitterName}
        />
      ))}
    </>
  </UserPageTemplate>
);

export default Twitters;
