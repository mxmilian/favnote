import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/theme';
import Button from 'components/atoms/Button/Button';

const Root = () => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <>
        <Button>Close/save!</Button>
      </>
    </ThemeProvider>
  </div>
);

export default Root;
