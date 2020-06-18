import React from 'react';
import Input from 'components/atoms/Input/Input';

export default {
  component: Input,
  title: 'atoms/Input',
};

export const Normal = () => <Input placeholder="input" />;
export const Search = () => <Input search placeholder="input" />;
