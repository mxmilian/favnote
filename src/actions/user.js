import axios from 'axios';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const authenticate = (name, email, password) => (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST });
  if (email) {
    return axios
      .post('/api/v1/users/signin', {
        email,
        password,
      })
      .then((payload) => {
        console.log(payload);
        dispatch({ type: AUTHENTICATE_SUCCESS, payload });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTHENTICATE_FAILURE });
      });
  }
  return axios
    .post('/api/v1/users/signin', {
      name,
      password,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: AUTHENTICATE_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: AUTHENTICATE_FAILURE });
    });
};
