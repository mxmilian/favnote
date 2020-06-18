import React from 'react';
import Card from 'components/molecules/Card/Card';

export default {
  component: Card,
  title: 'molecules/Card',
};

export const Note = () => <Card />;
export const Twitter = () => <Card cardType="twitter" />;
export const Article = () => <Card cardType="article" />;
