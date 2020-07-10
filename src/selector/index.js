const getVisibleNotes = (items = [], { text, sortBy }) =>
  items
    .filter((el) => el.title.toLowerCase().trim().includes(text.toLowerCase().trim()))
    .sort((a, b) => {
      if (sortBy === 'asc') return a.createdAt < b.createdAt ? 1 : -1;
      if (sortBy === 'desc') return a.createdAt < b.createdAt ? -1 : 1;
      return 1;
    });

export default getVisibleNotes;
