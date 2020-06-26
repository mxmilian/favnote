import { v4 as uuid } from 'uuid';

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';

export const removeNote = (id, itemType) => ({
  type: REMOVE_NOTE,
  payload: { id, itemType },
});

export const createNote = (itemType, itemContent) => ({
  type: CREATE_NOTE,
  payload: {
    itemType,
    item: {
      id: uuid(),
      created: Date.now(),
      ...itemContent,
    },
  },
});
