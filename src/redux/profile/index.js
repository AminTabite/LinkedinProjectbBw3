const initialState = {
  userName: "",
  userSurname: "",
  userImg: "",
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        userName: action.payload.name,
        userSurname: action.payload.surname,
        userImg: action.payload.image,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
