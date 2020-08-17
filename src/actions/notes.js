import axios from 'axios';
import store from 'store';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const FETCH_ALL_NOTES_REQUEST = 'FETCH_ALL_NOTES_REQUEST';
export const FETCH_ALL_NOTES_SUCCESS = 'FETCH_ALL_NOTES_SUCCESS';
export const FETCH_ALL_NOTES_FAILURE = 'FETCH_ALL_NOTES_FAILURE';

export const FETCH_ONE_REQUEST = 'FETCH_ONE_REQUEST';
export const FETCH_ONE_SUCCESS = 'FETCH_ONE_SUCCESS';
export const FETCH_ONE_FAILURE = 'FETCH_ONE_FAILURE';

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'REMOVE_FAILURE';

export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';

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
    .catch((err) => {
      if (!axios.isCancel(err)) {
        console.log(err);
      }

      return dispatch({ type: FETCH_FAILURE });
    });
};

export const fetchAllNotes = (itemType, source) => (dispatch) => {
  dispatch({ type: FETCH_ALL_NOTES_REQUEST });
  // const token = store.getState().users.accessToken;
  // console.log(token);
  // if (token) {
  //   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  // } else {
  //   axios.defaults.headers.common.Authorization = null;
  // }
  return axios
    .get('/api/v1/notes/all', {
      params: {
        type: itemType,
      },
      headers: {
        authorization: store.getState().users.accessToken
          ? `Bearer ${store.getState().users.accessToken}`
          : '',
      },
      cancelToken: source.token,
    })
    .then(({ data }) => {
      return dispatch({
        type: FETCH_ALL_NOTES_SUCCESS,
        payload: {
          data: data.data,
          itemType,
        },
      });
    })
    .catch((err) => {
      if (!axios.isCancel(err)) {
        console.log(err);
      }

      return dispatch({ type: FETCH_ALL_NOTES_FAILURE });
    });
};

export const fetchOneNote = (itemType, id) => (dispatch) => {
  dispatch({ type: FETCH_ONE_REQUEST });
  return axios
    .get(`/api/v1/notes/one`, {
      params: {
        id,
      },
      headers: {
        authorization: store.getState().users.accessToken
          ? `Bearer ${store.getState().users.accessToken}`
          : '',
      },
    })
    .then(({ data }) => {
      return dispatch({
        type: FETCH_ONE_SUCCESS,
        payload: {
          data: data.data.readDoc,
          itemType,
        },
      });
    })
    .catch((err) => dispatch({ type: FETCH_ONE_FAILURE }, console.log(err)));
};

export const removeNote = (id, itemType) => (dispatch) => {
  dispatch({ type: REMOVE_REQUEST });
  return axios
    .delete(`/api/v1/notes/${id}`)
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
    .post(
      '/api/v1/notes/',
      {
        type: itemType,
        ...itemContent,
      },
      // {
      //   headers: {
      //     authorization: store.getState().users.accessToken
      //       ? `Bearer ${store.getState().users.accessToken}`
      //       : '',
      //   },
      // },
    )
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
      return dispatch({
        type: CREATE_FAILURE,
        payload: {
          err: err.response.data.message,
        },
      });
    });
};

export const editNote = (id, itemType, itemContent) => (dispatch) => {
  dispatch({ type: EDIT_REQUEST });
  return axios
    .patch(`/api/v1/notes/${id}`, {
      ...itemContent,
    })
    .then(({ data }) =>
      dispatch({
        type: EDIT_SUCCESS,
        payload: {
          id,
          itemType,
          data: data.data.updatedDoc,
        },
      }),
    )
    .catch((err) => {
      console.log(err);
      return dispatch({ type: EDIT_FAILURE, err });
    });
};
