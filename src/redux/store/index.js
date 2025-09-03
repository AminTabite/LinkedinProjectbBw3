import ProfileReducer from "../profile";
import JobsReducer from "../jobs";
import Usersreducer from "../users";
import PostsReducer from "../posts";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../login";

const Reducer = combineReducers({
  profile: ProfileReducer,
  jobs: JobsReducer,
  users: Usersreducer,
  posts: PostsReducer,
  login: LoginReducer,
});

const store = configureStore({
  reducer: Reducer,
});

export default store;
