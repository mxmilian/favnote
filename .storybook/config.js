import React from 'react';
import { addDecorator } from '@storybook/react';

import GlobalStyle from 'theme/GlobalStyle';

addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));
