import { channelConstant } from "../constants";

export const setCurrentChannel = channel => dispatch => {
  dispatch({
    type: channelConstant.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  });
};
