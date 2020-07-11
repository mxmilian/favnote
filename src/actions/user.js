import axios from 'axios';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const authenticate = (name, email, password) => (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST });
  if (email) {
    return axios
      .post('/api/v1/users/signin', {
        email,
        password,
      })
      .then((payload) => dispatch({ type: AUTHENTICATE_SUCCESS, payload }))
      .catch((err) => dispatch({ type: AUTHENTICATE_FAILURE, err }));
  }
  return axios
    .post('/api/v1/users/signin', {
      name,
      password,
    })
    .then((payload) => dispatch({ type: AUTHENTICATE_SUCCESS, payload }))
    .catch((err) => dispatch({ type: AUTHENTICATE_FAILURE, err }));
};

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
  return axios.get('/api/v1/friends/').then(({ data }) =>
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        userID: data.data.userID,
        data: data.data.user,
        itemType: 'users',
      },
    }),
  );
};
