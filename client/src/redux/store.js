import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movies from "./slices/movies";
import search from "./slices/search";

const reducer = combineReducers({
    movies,
    search,
});

export default configureStore({ reducer });
