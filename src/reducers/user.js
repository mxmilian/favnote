import {
  ACC_SUCCESS,
  AUTHENTICATE_SUCCESS,
  FETCH_USERS_SUCCESS,
  // FETCH_FAILURE,
  // CREATE_REQUEST
  REQ_SUCCESS,
} from 'actions/user';

const usersInitialState = {};

const userReducer = (state = usersInitialState, action) => {
  const { type } = action;
  switch (type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        userID: action.payload.data.data.user._id,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        userID: action.payload.userID,
        [action.payload.itemType]: [...action.payload.data],
      };
    case REQ_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: state.users.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          if (user._id === action.payload.data._id) return { ...user, ...action.payload.data };
          return user;
        }),
      };
    case ACC_SUCCESS:
      return {
        ...state,
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
