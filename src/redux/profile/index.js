const initialState = {
  userName: "",
  userSurname: "",
  userImg: "",
  userArea: "",
  userBio: "",
  userEmail: "",
  userTitle: "",
  created: "",
  updated: "",
  nickName: "",
  userId: "",
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        userName: action.payload.name,
        userSurname: action.payload.surname,
        userImg: action.payload.image,
        userArea: action.payload.area,
        userBio: action.payload.bio,
        userEmail: action.payload.email,
        userTitle: action.payload.title,
        created: action.payload.createdAt,
        updated: action.payload.updatedAt,
        nickName: action.payload.username,
        userId: action.payload._id,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
