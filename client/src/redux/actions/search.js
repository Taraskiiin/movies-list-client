import { setSearch } from "../slices/search";

export const getterSearch = (str) => async (dispatch) => {
    dispatch(setSearch(str));
};
