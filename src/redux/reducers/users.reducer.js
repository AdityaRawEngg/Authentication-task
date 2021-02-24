import { userActionTypes } from "../constants/userAction.types";

const initialState = { user: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.ADD:
      return {
        ...state,
        user: { ...action.payload.user },
      };
    case userActionTypes.GET:
      return {
        ...state,
        user: { ...action.payload.user },
      };

    default:
      return { ...state };
  }
};

export default userReducer;
