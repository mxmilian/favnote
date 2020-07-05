import axios from 'axios';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const authenticateWithUsername = (name, password) => (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST });
  return axios
    .post('http://localhost:1337/api/v1/users/signin', {
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
