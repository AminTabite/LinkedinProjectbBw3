import ProfileReducer from "../profile";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const Reducer = combineReducers({
  profile: ProfileReducer,
});

const store = configureStore({
  reducer: Reducer,
});

export default store;
