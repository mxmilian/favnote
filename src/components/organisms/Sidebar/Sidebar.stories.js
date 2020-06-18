import React from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import { MemoryRouter } from 'react-router';

export default {
  component: Sidebar,
  title: 'organisms/Sidebar',
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

export const Note = () => <Sidebar />;
