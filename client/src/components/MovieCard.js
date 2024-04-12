import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Text, Flex, IconButton, Skeleton } from "@chakra-ui/react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import {
    addFavorites,
    removeFromFavorites,
    removeMovie,
} from "../redux/actions/movies";

const ProductCard = ({ movie, loading }) => {
    const { id } = movie;
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = () => {
        dispatch(removeFromFavorites(id));
    };

    const handleAddToFavorites = () => {
        dispatch(addFavorites(id));
    };

    const handleRemoveMovie = () => {
        dispatch(removeFromFavorites(id));
        dispatch(removeMovie(id));
    };

    const { favorites } = useSelector((state) => state.movies);

    const isFavorite =
        favorites && Array.isArray(favorites) && favorites.includes(id);

    return (
        <Skeleton isLoaded={!loading}>
            <Box
                _hover={{
                    transform: "scale(1.1)",
                    transitionDuration: "0.5s",
                }}
                borderWidth="1px"
                overflow="hidden"
                p="4"
                shadow="md"
                h="100%"
            >
                <ReactLink to={`/movie/${movie.id}`}>
                    <Image
                        src={movie.image}
                        alt={movie.title}
                        height="250px"
                        width="300px"
                        objectFit="contain"
                        fallbackSrc="https://via.placeholder.com/250"
                    />
                    <Box>
                        <Text
                            noOfLines={1}
                            fontSize="xl"
                            fontWeight="semibold"
                            mt="2"
                        >
                            {movie.title}
                        </Text>
                        <Flex
                            justify="space-between"
                            alignItems="center"
                            mt="1"
                        >
                            <Text
                                fontSize="xl"
                                fontWeight="semibold"
                                color="cyan.600"
                            >
                                Rating: {movie.rating}
                            </Text>
                        </Flex>
                    </Box>
                </ReactLink>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py="1"
                >
                    <Box
                        display="flex"
                        gap="2"
                    >
                        <IconButton
                            icon={<FaExternalLinkAlt size="20" />}
                            colorScheme="green"
                            size="sm"
                            aria-label=""
                            as={ReactLink}
                            to={`/movie/${movie.id}`}
                        />
                        {isFavorite ? (
                            <IconButton
                                icon={<MdOutlineFavorite size="20" />}
                                colorScheme="cyan"
                                size="sm"
                                aria-label=""
                                onClick={handleRemoveFromFavorites}
                            />
                        ) : (
                            <IconButton
                                icon={<MdOutlineFavoriteBorder size="20" />}
                                colorScheme="cyan"
                                size="sm"
                                aria-label=""
                                onClick={handleAddToFavorites}
                            />
                        )}
                    </Box>
                    <IconButton
                        icon={<FaTrash size="20" />}
                        colorScheme="red"
                        size="sm"
                        aria-label=""
                        onClick={handleRemoveMovie}
                    />
                </Box>
            </Box>
        </Skeleton>
    );
};

export default ProductCard;
