import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { notes } from 'data/dummyData';

const Notes = () => (
  <GridTemplate pageType="notes">
    {notes.map(({ id, title, created, content }) => (
      <Card cardType="notes" id={id} key={id} title={title} created={created} content={content} />
    ))}
  </GridTemplate>
);

export default Notes;
