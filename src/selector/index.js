const getVisibleNotes = (notes, { text }) =>
  notes.filter((note) => note.title.toLowerCase().trim().includes(text.toLowerCase().trim()));
export default getVisibleNotes;
