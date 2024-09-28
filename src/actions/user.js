import {SET_USER, UPDATE_USER, RESET_USER} from '../constants/actions/user';

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
});

export const resetUser = () => ({
  type: RESET_USER,
});
