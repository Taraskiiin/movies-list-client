import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: null,
    movies: [],
    movie: null,
    pagination: {},
    favoritesToggled: false,
    reviewed: false,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setMovies: (state, action) => {
            state.loading = false;
            state.error = null;
            state.movies = action.payload;
        },
        setMovie: (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.error = null;
            state.reviewed = false;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setPagination: (state, action) => {
            state.loading = false;
            state.error = null;
            state.pagination = action.payload;
        },
        setFavorites: (state) => {
            state.favorites = JSON.parse(
                localStorage.getItem("favorites") || "[]"
            );
        },
        setFavoritesToggle: (state, action) => {
            state.favoritesToggled = action.payload;
        },
    },
});

export const {
    setLoading,
    setPagination,
    setMovies,
    setMovie,
    setError,
    setFavorites,
    setFavoritesToggle,
} = movieSlice.actions;

export default movieSlice.reducer;

export const movieSelector = (state) => state.movies;
