import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import Button from 'components/atoms/Button/Button';

export default {
  component: Button,
  title: 'atoms/Button',
  decorators: [withKnobs],
};

const dynamicKnobs = ({ theme }) => {
  const label = 'Colors';
  const options = {
    Primary: theme.notes,
    Secondary: theme.twitters,
    Tertiary: theme.articles,
  };
  const defaultValue = 'hsl(49, 100%, 58%)';
  const groupId = 'GROUP-ID1';

  return select(label, options, defaultValue, groupId);
};

export const Primary = () => <Button color={dynamicKnobs}>Hello Button</Button>;

export const Secondary = () => <Button secondary>Hello Button</Button>;
