import { colorsConstatns } from "../constants";

export const setColors = (primaryColor, secondaryColor) => dispatch => {
  dispatch({
    type: colorsConstatns.SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor
    }
  });
};
