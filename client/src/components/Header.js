import React, { useEffect } from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import { toggleFavorites } from "../redux/actions/movies";

const Header = () => {
    const dispatch = useDispatch();
    const { favoritesToggled } = useSelector((state) => state.movies);

    useEffect(() => {}, [favoritesToggled, dispatch]);

    return (
        <Box
            bg="gray.900"
            p="4"
            display="flex"
            justifyContent="flex-end"
        >
            {favoritesToggled ? (
                <IconButton
                    icon={<MdOutlineFavorite size="20" />}
                    onClick={() => dispatch(toggleFavorites(false))}
                    variant="ghost"
                    aria-label={""}
                />
            ) : (
                <IconButton
                    icon={<MdOutlineFavoriteBorder size="20" />}
                    onClick={() => dispatch(toggleFavorites(true))}
                    variant="ghost"
                    aria-label={""}
                />
            )}
        </Box>
    );
};

export default Header;
