import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import Button from 'components/Button/Button';

const Root = () => (
  <div>
    <GlobalStyle />
    <h1>This is my new application</h1>
    <Button>Close/save!</Button>
    <Button secondary>Remove</Button>
  </div>
);

export default Root;
