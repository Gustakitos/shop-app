import {
  AUTHENTICATE,
  LOGOUT
} from "../actions/authActions";

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.payload.token,
        userId: action.payload.userId
      }
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.payload.token,
    //     userId: action.payload.userId
    //   }
    default:
      return state;
  }
}

