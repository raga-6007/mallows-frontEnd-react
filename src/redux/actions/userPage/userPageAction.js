import { UserPageApi } from "api/userPageApi";
import { USER_SUCCESS, USER_FAILURE, CLEAR_USER } from "../types";

export const userPageSuccess = (userdata) => ({
  type: USER_SUCCESS,
  payload: userdata,
});

export const userPageFailure = (error) => ({
  type: USER_FAILURE,
  payload: error,
});

export const userPageOrder = (error) => ({
  type: CLEAR_USER,
});

export const getuserPage = (postData) => {
  return (dispatch) => {
    UserPageApi()
      .then((response) => {
        dispatch(userPageSuccess(response.data));
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        dispatch(userPageFailure(error.message));
      });
  };
};
