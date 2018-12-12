import { authConstant } from "../constants";

const initialState = {
  currentUser: null,
  isLoading: true
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authConstant.SET_USER:
      return Object.assign(
        {},
        { ...state },
        {
          currentUser: payload.currentUser,
          isLoading: false
        }
      );
    case authConstant.CLEAR_USER:
      return { ...state, isLoading: false };
    default: {
      return state;
    }
  }
};
