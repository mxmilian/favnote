const getVisibleNotes = (notes = [], { text, sortBy }) =>
  notes
    .filter((note) => note.title.toLowerCase().trim().includes(text.toLowerCase().trim()))
    .sort((a, b) => {
      if (sortBy === 'asc') return a.created < b.created ? 1 : -1;
      if (sortBy === 'desc') return a.created < b.created ? -1 : 1;
      return 1;
    });

export default getVisibleNotes;
