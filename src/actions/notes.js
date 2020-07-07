import axios from 'axios';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'REMOVE_FAILURE';

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
    .catch((err) => dispatch({ type: FETCH_FAILURE }, console.log(err)));
};

export const removeNote = (id, itemType) => (dispatch) => {
  dispatch({ type: REMOVE_REQUEST });
  return axios
    .delete('/api/v1/notes/', {
      params: {
        id,
      },
    })
    .then(() =>
      dispatch({
        type: REMOVE_SUCCESS,
        payload: {
          id,
          itemType,
        },
      }),
    )
    .catch((err) => dispatch({ type: REMOVE_FAILURE }, console.log(err)));
};

export const createNote = (itemType, itemContent) => (dispatch) => {
  dispatch({ type: CREATE_REQUEST });
  return axios
    .post('/api/v1/notes/', {
      type: itemType,
      ...itemContent,
    })
    .then(({ data }) =>
      dispatch({
        type: CREATE_SUCCESS,
        payload: {
          itemType,
          item: {
            ...data.data.createdDoc,
          },
        },
      }),
    )
    .catch((err) => {
      console.log(err);
      return dispatch({ type: CREATE_FAILURE });
    });
};
