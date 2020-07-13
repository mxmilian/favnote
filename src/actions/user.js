import axios from 'axios';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const REQ_REQUEST = 'REQ_REQUES';
export const REQ_SUCCESS = 'REQ_SUCCESS';
export const REQ_FAILURE = 'REQ_FAILURE';

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
  dispatch({ type: FETCH_USERS_REQUEST });
  return axios.get('/api/v1/friends/').then(({ data }) => {
    console.log(data.data.user);
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        userID: data.data.userID,
        data: data.data.user,
        itemType: 'users',
      },
    });
  });
};

export const reqFriend = (id) => (dispatch) => {
  dispatch({ type: REQ_REQUEST });
  return axios
    .post('/api/v1/friends/req', {
      id,
    })
    .then(({ data }) => {
      console.log(data.data.reqUser);
      return dispatch({
        type: REQ_SUCCESS,
        payload: {
          id,
          data: data.data.reqUser[0],
          itemType: 'users',
        },
      });
    })
    .catch((err) => console.log(err));
};
