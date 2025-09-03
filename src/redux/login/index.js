const initialState = {
  login: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG-IN":
      return {
        login: action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
