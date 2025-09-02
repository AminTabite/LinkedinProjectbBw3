const initialState = {
  postsArray: [],
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        postsArray: action.payload,
      };

    default:
      return state;
  }
};

export default PostsReducer;
