import * as types from "./actionTypes";

const initialState = {
  userId: null,
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {

    case types.SET_USER:
      return {
        ...state,
        type: types.SET_USER,
        userId: action.userId,
        status: action.status
      }

    case types.REGISTER:
      return {
        ...state,
        type: types.SET_USER,
        userId: action.data,
        status: action.status
      }

    case types.LOGIN:
      return {
        ...state,
        type: types.LOGIN,
        userId: action.data,
        status: action.status
      }
    
    case types.LOGOUT:
      return {
        ...state,
        type: types.LOGOUT,
        userId:null,
        token: null,
        status: action.status
    }

    default:
      return state;
  }
}
