import axios from 'axios';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

export const REMOVE_NOTE = 'REMOVE_NOTE';

export const fetchNotes = (itemType) => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
  return axios
    .get('/api/v1/notes/type', {
      params: {
        type: itemType,
      },
    })
    .then(({ data }) =>
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data: data.data.readDoc,
          itemType,
        },
      }),
    )
    .catch((err) => dispatch({ FETCH_FAILURE }, err));
};

export const removeNote = (id, itemType) => ({
  type: REMOVE_NOTE,
  payload: { id, itemType },
});

export const createNote = (itemType, itemContent) => (dispatch) => {
  dispatch({ type: CREATE_REQUEST });
  console.log(itemType, itemContent);
  return axios
    .post('/api/v1/notes/', {
      type: itemType,
      ...itemContent,
    })
    .then(({ data }) => {
      console.log(data);
      return dispatch({
        type: CREATE_SUCCESS,
        payload: {
          itemType,
          item: {
            ...data.data.createdDoc,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return dispatch({ type: CREATE_FAILURE });
    });
};
