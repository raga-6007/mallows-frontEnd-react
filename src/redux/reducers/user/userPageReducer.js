// src/reducers/checkout/placeorderReducer.js
import {
    USER_SUCCESS, USER_FAILURE, CLEAR_USER 
  } from "../../actions/types";
  
  const initialState = {
    userData: null,
    error: null,
  };
  
  export const userPageReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          error: null,
          status:true
        };
      case USER_FAILURE:
        return {
          ...state,
          userData: null,
          error: action.payload,
        };
      case CLEAR_USER:
        return {
          ...state,
          userData: null,
          error: null,
        };
      default:
        return state;
    }
  };
  