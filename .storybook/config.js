import React from 'react';
import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/theme';

addDecorator((story) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </>
));
