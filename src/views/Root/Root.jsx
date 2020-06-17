import React from 'react';
import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';

const Root = () => (
  <MainTemplate>
    <>
      <h1>Hello Max!</h1>
      <Button>Close/save!</Button>
      <Button secondary>Close/save!</Button>
    </>
  </MainTemplate>
);

export default Root;
