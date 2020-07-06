import axios from 'axios';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';

export const fetchNotes = (itemType) => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
  return axios
    .get('/api/v1/notes/type', {
      params: {
        type: itemType,
      },
    })
    .then(({ data }) => {
      console.log(data.data.readDoc);
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data: data.data.readDoc,
          itemType,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ FETCH_FAILURE }, err);
    });
};

export const removeNote = (id, itemType) => ({
  type: REMOVE_NOTE,
  payload: { id, itemType },
});

export const createNote = (itemType, itemContent) => ({
  type: CREATE_NOTE,
  payload: {
    itemType,
    item: {
      ...itemContent,
    },
  },
});
