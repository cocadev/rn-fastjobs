import * as types from './actionTypes';
import _ from 'underscore'


export function setUser(userId){
  return dispatch =>{
    dispatch({
      type:types.SET_USER, 
      userId: userId,
    });
  }
}

export function getUser(userId){
  return dispatch =>{
    dispatch({
      type:types.GET_USER, 
      userId: userId
    });
  }
}

export const logOut = () => {
  return dispatch => {
      dispatch({ 
        type: types.LOGOUT 
      });
    }
};

