import ProfileReducer from "../profile";
import JobsReducer from "../jobs";
import Usersreducer from "../users";
import PostsReducer from "../posts";
import AuthReducer from "../auth";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const Reducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  jobs: JobsReducer,
  users: Usersreducer,
  posts: PostsReducer,
});

const store = configureStore({
  reducer: Reducer,
});

export default store;
