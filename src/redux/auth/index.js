import { getAuthData } from '../../config/constants';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "LOAD_USER_FROM_STORAGE":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case "AUTH_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Action creators
export const loginUser = (userData) => (dispatch) => {
  try {
    localStorage.setItem("userIdSession", JSON.stringify(userData));
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userIdSession");
  dispatch({ type: "LOGOUT" });
};

export const loadUserFromStorage = () => (dispatch) => {
  const authData = getAuthData();
  if (authData) {
    dispatch({
      type: "LOAD_USER_FROM_STORAGE",
      payload: authData,
    });
  }
};

export default AuthReducer;