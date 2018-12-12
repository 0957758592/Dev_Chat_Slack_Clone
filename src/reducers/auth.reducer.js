import { authConstatnt } from "../constants";

const initialState = {
  currentUser: null,
  isLoading: true
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authConstatnt.SET_USER:
      return Object.assign(
        {},
        { ...state },
        {
          currentUser: payload.currentUser,
          isLoading: false
        }
      );
    case authConstatnt.CLEAR_USER:
      return { ...initialState, isLoading: false };
    default: {
      return { ...state };
    }
  }
};
