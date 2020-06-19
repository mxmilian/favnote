import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Card from 'components/molecules/Card/Card';

const Articles = () => (
  <UserPageTemplate pageType="article">
    <>
      <Card cardType="article" />
      <Card cardType="article" />
      <Card cardType="article" />
      <Card cardType="article" />
      <Card cardType="article" />
    </>
  </UserPageTemplate>
);

export default Articles;
