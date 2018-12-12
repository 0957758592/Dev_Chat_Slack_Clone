import { authConstatnt } from "../constants";

export const setUser = user => dispatch => {
  dispatch({
    type: authConstatnt.SET_USER,
    payload:{ currentUser: user}
  });
};

export const clearUser = () => dispatch => {
  dispatch({
    type: authConstatnt.CLEAR_USER
  })
}
