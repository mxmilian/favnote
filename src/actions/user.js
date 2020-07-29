import axios from 'axios';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_ONE_USER_REQUEST = 'FETCH_ONE_USER_REQUEST';
export const FETCH_ONE_USER_SUCCESS = 'FETCH_ONE_USER_SUCCESS';
export const FETCH_ONE_USER_FAILURE = 'FETCH_ONE_USER_FAILURE';

export const REQ_REQUEST = 'REQ_REQUEST';
export const REQ_SUCCESS = 'REQ_SUCCESS';
export const REQ_FAILURE = 'REQ_FAILURE';

export const ACC_REQUEST = 'ACC_REQUEST';
export const ACC_SUCCESS = 'ACC_SUCCESS';
export const ACC_FAILURE = 'ACC_FAILURE';

export const REJ_REQUEST = 'REJ_REQUEST';
export const REJ_SUCCESS = 'REJ_SUCCESS';
export const REJ_FAILURE = 'REJ_FAILURE';
export const authenticate = (name, email, password) => (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST });
  if (email) {
    return axios
      .post('/api/v1/users/signin', {
        email,
        password,
      })
      .then(({ data }) =>
        dispatch({
          type: AUTHENTICATE_SUCCESS,
          payload: {
            // eslint-disable-next-line no-underscore-dangle
            userID: data.data.user._id,
          },
        }),
      )
      .catch((err) => dispatch({ type: AUTHENTICATE_FAILURE, err }));
  }
  return axios
    .post('/api/v1/users/signin', {
      name,
      password,
    })
    .then(({ data }) =>
      dispatch({
        type: AUTHENTICATE_SUCCESS,
        payload: {
          // eslint-disable-next-line no-underscore-dangle
          userID: data.data.user._id,
        },
      }),
    )
    .catch((err) => dispatch({ type: AUTHENTICATE_FAILURE, err }));
};

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCH_ONE_USER_REQUEST });
  return axios
    .get('/api/v1/users/user')
    .then(({ data }) =>
      dispatch({
        type: FETCH_ONE_USER_SUCCESS,
        payload: {
          // eslint-disable-next-line no-underscore-dangle
          userID: data.data.readDoc._id,
        },
      }),
    )
    .catch((err) => console.log(err));
};

export const register = (name, email, password, confirmPassword) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post('/api/v1/users/signup', {
      name,
      email,
      password,
      confirmPassword,
    })
    .then(({ data }) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          // eslint-disable-next-line no-underscore-dangle
          userID: data.data.user._id,
        },
      }),
    )
    .catch((err) => {
      console.log(err);
      return dispatch({ type: REGISTER_FAILURE, err });
    });
};

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  return axios.get('/api/v1/friends/').then(({ data }) =>
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        userID: data.data.userID,
        data: data.data.user,
        itemType: 'users',
      },
    }),
  );
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

export const accFriend = (id) => (dispatch) => {
  dispatch({ type: ACC_REQUEST });
  return axios
    .post('/api/v1/friends/acc', {
      id,
    })
    .then(({ data }) => {
      console.log(data.data.accUser);
      return dispatch({
        type: REQ_SUCCESS,
        payload: {
          id,
          data: data.data.accUser[0],
          itemType: 'users',
        },
      });
    })
    .catch((err) => console.log(err));
};

export const rejFriend = (id) => (dispatch) => {
  dispatch({ type: REJ_REQUEST });
  return axios
    .post('/api/v1/friends/rej', {
      id,
    })
    .then(({ data }) => {
      console.log(data.data.rejUser);
      return dispatch({
        type: REQ_SUCCESS,
        payload: {
          id,
          data: data.data.rejUser[0],
          itemType: 'users',
        },
      });
    })
    .catch((err) => console.log(err));
};
