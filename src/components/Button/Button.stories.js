import React from 'react';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
};

export const Primary = () => <Button>Hello Button</Button>;

export const Secondary = () => <Button secondary>Hello Button</Button>;
