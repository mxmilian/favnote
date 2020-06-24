export const REMOVE_NOTE = 'REMOVE_NOTE';

export const removeNote = (id, cardType) => ({
  type: REMOVE_NOTE,
  payload: { id, cardType },
});
