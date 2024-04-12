import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movies from "./slices/movies";

const reducer = combineReducers({
  movies,
});

export default configureStore({ reducer });