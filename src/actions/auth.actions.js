import { authConstant } from "../constants";

export const setUser = user => dispatch => {
  dispatch({
    type: authConstant.SET_USER,
    payload: { currentUser: user }
  });
};

export const clearUser = () => dispatch => {
  dispatch({
    type: authConstant.CLEAR_USER
  });
};
