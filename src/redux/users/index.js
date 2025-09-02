const initialState = {
  usersArray: [],
};

const Usersreducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        usersArray: action.payload,
      };
    default:
      return state;
  }
};

export default Usersreducer;
