import ProfileReducer from "../profile";
import JobsReducer from "../jobs";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const Reducer = combineReducers({
  profile: ProfileReducer,
  jobs: JobsReducer,
});

const store = configureStore({
  reducer: Reducer,
});

export default store;
