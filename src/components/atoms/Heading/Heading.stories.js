import React from 'react';
import Heading from 'components/atoms/Heading/Heading';

export default {
  component: Heading,
  title: 'atoms/Heading',
};

export const Normal = () => <Heading>This is heading!</Heading>;
export const Big = () => <Heading big>This is big heading!</Heading>;
