import { USERS } from 'utils/constants';

const getVisibleNotes = (items = [], { text, sortBy, shared }, pageContext = '', userID = '') => {
  if (pageContext === USERS)
    return items
      .filter(({ name }) => name.toLowerCase().trim().includes(text.toLowerCase().trim()))
      .sort((a, b) => {
        if (sortBy === 'asc') return a.createdAt < b.createdAt ? 1 : -1;
        if (sortBy === 'desc') return a.createdAt < b.createdAt ? -1 : 1;
        return 1;
      });

  if (shared) {
    return items
      .filter(({ title }) => title.toLowerCase().trim().includes(text.toLowerCase().trim()))
      .sort((a, b) => {
        if (sortBy === 'asc') return a.createdAt < b.createdAt ? 1 : -1;
        if (sortBy === 'desc') return a.createdAt < b.createdAt ? -1 : 1;
        return 1;
      });
  }

  return items
    .filter(({ title }) => title.toLowerCase().trim().includes(text.toLowerCase().trim()))
    .sort((a, b) => {
      if (sortBy === 'asc') return a.createdAt < b.createdAt ? 1 : -1;
      if (sortBy === 'desc') return a.createdAt < b.createdAt ? -1 : 1;
      return 1;
    })
    .filter((el) => el.userID === userID);
};

export default getVisibleNotes;
