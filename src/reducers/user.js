import {
  AUTHENTICATE_SUCCESS,
  FETCH_SUCCESS,
  // FETCH_FAILURE,
  // CREATE_REQUEST
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
    case FETCH_SUCCESS:
      return {
        ...state,
        userID: action.payload.userID,
        [action.payload.itemType]: [...action.payload.data],
      };
    default:
      return state;
  }
};

export default userReducer;
