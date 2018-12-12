import { channelConstant } from "../constants";

const initialState = {
  currentChannel: null
};

export const channelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case channelConstant.SET_CURRENT_CHANNEL:
      return Object.assign(
        {},
        { ...state },
        {
          currentChannel: payload.currentChannel
        }
      );
    default: {
      return state;
    }
  }
};
