import { channelConstant } from "../constants";

const initialState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
};

export const channelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case channelConstant.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload.currentChannel
      };
    case channelConstant.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: payload.isPrivateChannel
      };
    case channelConstant.SET_USER_POSTS:
      return {
        ...state,
        userPosts: payload.userPosts
      };
    default: {
      return state;
    }
  }
};
