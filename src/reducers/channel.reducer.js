import { channelConstant } from "../constants";

const initialState = {
  currentChannel: null,
  isPrivateChannel: false
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
      case channelConstant.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: payload.isPrivateChannel
      }

    default: {
      return state;
    }
  }
};
