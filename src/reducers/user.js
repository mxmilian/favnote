import { AUTHENTICATE_SUCCESS } from 'actions/user';

const userReducer = (state = '', action) => {
  const { type } = action;
  switch (type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        userID: action.payload.data.data.user._id,
      };
    default:
      return state;
  }
};

export default userReducer;
