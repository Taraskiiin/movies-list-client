import axios from "axios";
import { Dispatch } from "redux";
import {
    setMovies,
    setLoading,
    setError,
    setPagination,
    setFavorites,
    setFavoritesToggle,
    setMovie,
} from "../slices/movies";

export const getMovies = (page) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.get(
            `http://localhost:5001/api/all/${page}/${9}`
        );
        const { movies, pagination } = data;
        dispatch(setMovies(movies));
        dispatch(setPagination(pagination));
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : "An expected error has occurred. Please try again later"
            )
        );
    }
};

export const getMovie = (id) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.get(
            `http://localhost:5001/api/movie/${id}`
        );
        dispatch(setMovie(data));
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : "An expected error has occurred. Please try again later"
            )
        );
    }
};

export const addFavorites = (id) => async (dispatch, getState) => {
    const {
        movies: { favorites },
    } = getState();

    const newFavorites = [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    dispatch(setFavorites());
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
    const {
        movies: { favorites },
    } = getState();
    const newFavorites = favorites.filter((favorite) => favorite !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    dispatch(setFavorites());
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
    const {
        movies: { favorites, movies },
    } = getState();

    const firstPage = 1;

    if (toggle) {
        const filteredMovies = movies.filter((movie) =>
            favorites.includes(movie.id)
        );
        dispatch(setFavoritesToggle(true));
        dispatch(setMovies(filteredMovies));
    } else {
        dispatch(setFavoritesToggle(false));
        dispatch(getMovies(firstPage));
    }
};

export const removeMovie = (id) => async (dispatch) => {
    const firstPage = 1;
    try {
        await axios.delete(`http://localhost:5001/api/delete/${id}`);
        dispatch(getMovies(firstPage));
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : "An expected error has occurred. Please try again later"
            )
        );
    }
};
