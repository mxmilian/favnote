import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Card from 'components/molecules/Card/Card';
import { notes } from 'data/dummyData';

const Notes = () => (
  <UserPageTemplate pageType="note">
    <>
      {notes.map(({ title, created, content }) => (
        <Card cardType="note" key={title} title={title} created={created} content={content} />
      ))}
    </>
  </UserPageTemplate>
);

export default Notes;
