import React, { useEffect, useState } from "react";
import {
    IconButton,
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
    Button,
} from "@chakra-ui/react";

import { CiSearch } from "react-icons/ci";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import { toggleFavorites } from "../redux/actions/movies";
import { getterSearch } from "../redux/actions/search";

const Header = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const { favoritesToggled } = useSelector((state) => state.movies);

    useEffect(() => {}, [favoritesToggled, dispatch]);

    const handleClickSearch = () => {
        dispatch(getterSearch(searchValue));
        setSearchValue("");
    };

    return (
        <Box
            bg="gray.900"
            p="4"
            display="flex"
            justifyContent="center"
            gap="20px"
            alignItems="center"
        >
            <InputGroup
                borderRadius={5}
                size="sm"
                maxWidth="500px"
            >
                <InputLeftElement
                    pointerEvents="none"
                    children={
                        <CiSearch
                            color="gray.600"
                            size="20"
                        />
                    }
                />
                <Input
                    type="text"
                    placeholder="Search..."
                    border="1px solid #949494"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <InputRightAddon
                    p={0}
                    border="none"
                >
                    <Button
                        size="sm"
                        borderLeftRadius={0}
                        borderRightRadius={3.3}
                        onClick={handleClickSearch}
                    >
                        Search
                    </Button>
                </InputRightAddon>
            </InputGroup>
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
