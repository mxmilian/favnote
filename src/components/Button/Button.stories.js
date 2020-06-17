import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs],
};

const dynamicKnobs = () => {
  const label = 'Colors';
  const options = {
    Primary: 'hsl(49, 100%, 58%)',
    Secondary: 'hsl(196, 83%, 75%)',
    Tertiary: 'hsl(106, 47%, 64%)',
  };
  const defaultValue = 'hsl(49, 100%, 58%)';
  const groupId = 'GROUP-ID1';

  return select(label, options, defaultValue, groupId);
};

export const Primary = () => <Button color={dynamicKnobs}>Hello Button</Button>;

export const Secondary = () => <Button secondary>Hello Button</Button>;
