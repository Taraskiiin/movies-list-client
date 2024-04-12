import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Wrap,
    WrapItem,
    Center,
    IconButton,
    Button,
    AlertDescription,
    Alert,
    AlertIcon,
    AlertTitle,
} from "@chakra-ui/react";

import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import { getMovies } from "../redux/actions/movies";
import MovieCard from "../components/MovieCard";

export default function MoviesScreen() {
    const dispatch = useDispatch();

    const { loading, error, movies, pagination, favoritesToggled } =
        useSelector((state) => state.movies);

    useEffect(() => {
        if (!movies?.length || movies?.length < 0) {
            dispatch(getMovies(1));
        }
    }, [dispatch]);

    const paginationButtonClick = (page) => {
        dispatch(getMovies(page));
    };

    return (
        <Box>
            <Wrap
                spacing="30px"
                justify="center"
                minHeight="80hv"
                mx={{ base: "12", md: "20", lg: "32" }}
            >
                {error ? (
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>We are sorry!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    movies?.map((movie) => (
                        <WrapItem key={movie.id}>
                            <Center
                                w="250px"
                                h="450px"
                            >
                                <MovieCard
                                    movie={movie}
                                    loading={loading}
                                />
                            </Center>
                        </WrapItem>
                    ))
                )}
            </Wrap>
            {!favoritesToggled && !error && (
                <Wrap
                    spacing="30px"
                    justify="center"
                    p="5"
                >
                    <IconButton
                        icon={<MdOutlineKeyboardDoubleArrowLeft />}
                        colorScheme="cyan"
                        onClick={() => paginationButtonClick(1)}
                        aria-label={""}
                    />
                    {Array.from(Array(pagination?.totalPages), (e, i) => {
                        return (
                            <Button
                                colorScheme={
                                    pagination?.currentPage === i + 1
                                        ? "cyan"
                                        : "gray"
                                }
                                key={i}
                                onClick={() => paginationButtonClick(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        );
                    })}
                    <IconButton
                        icon={<MdOutlineKeyboardDoubleArrowRight />}
                        colorScheme="cyan"
                        onClick={() =>
                            paginationButtonClick(pagination.totalPages)
                        }
                        aria-label={""}
                    />
                </Wrap>
            )}
        </Box>
    );
}
