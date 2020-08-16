import {
  ACC_SUCCESS,
  AUTHENTICATE_SUCCESS,
  FETCH_ONE_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  REGISTER_SUCCESS,
  REJ_SUCCESS,
  REQ_SUCCESS,
  DEAUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
} from 'actions/user';

const usersInitialState = {};

const userReducer = (state = usersInitialState, action) => {
  const { type } = action;
  switch (type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        failure: undefined,
        // eslint-disable-next-line no-underscore-dangle
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        failure: action.payload.err,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        failure: undefined,
        // eslint-disable-next-line no-underscore-dangle
        userID: action.payload.userID,
      };
    case DEAUTHENTICATE_SUCCESS:
      return {
        ...state,
        failure: undefined,
        name: action.payload.name,
        userID: action.payload.userID,
      };
    case FETCH_ONE_USER_SUCCESS:
      return {
        ...state,
        failure: undefined,
        userID: action.payload.userID,
        name: action.payload.name,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        failure: undefined,
        userID: action.payload.userID,
        [action.payload.itemType]: [...action.payload.data],
      };
    case REQ_SUCCESS:
      return {
        ...state,
        failure: undefined,
        [action.payload.itemType]: state.users.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          if (user._id === action.payload.data._id) return { ...user, ...action.payload.data };
          return user;
        }),
      };
    case ACC_SUCCESS:
      return {
        ...state,
        failure: undefined,
        [action.payload.itemType]: state.users.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          if (user._id === action.payload.data._id) return { ...user, ...action.payload.data };
          return user;
        }),
      };
    case REJ_SUCCESS:
      return {
        ...state,
        failure: undefined,
        [action.payload.itemType]: state.users.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          if (user._id === action.payload.data._id) return { ...user, ...action.payload.data };
          return user;
        }),
      };
    default:
      return state;
  }
};

export default userReducer;
