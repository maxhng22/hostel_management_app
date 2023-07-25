import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_LOGOUT,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  GET_PROFILE_REQUEST, GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS, SEARCH_PROFILE_REQUEST,
  SEARCH_PROFILE_SUCCESS, SEARCH_PROFILE_FAIL
} from "../constants/userConstants";



function userSigninReducer(state = {}, action) {

  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true, status: false };
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, status: true };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    case USER_LOGOUT:
      return { ...state, loading: false, status: false, data: {} };
    default: return state;
  }
}


function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true, status: false };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, status: true };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}

function userSignupReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true, status: false };
    case USER_SIGNUP_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, status: true };
    case USER_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}

function userGetProfileReducer(state = {}, action) {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, status: false };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case GET_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}

function userSearchProfileReducer(state = {}, action) {
  switch (action.type) {
    case SEARCH_PROFILE_REQUEST:
      return { ...state, loading: true, status: false };
    case SEARCH_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case SEARCH_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };
    default: return state;
  }
}


export {
  userSigninReducer,
  userSignupReducer,
  userUpdateReducer,
  userGetProfileReducer,
  userSearchProfileReducer
}