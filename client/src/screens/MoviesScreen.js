import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Wrap,
    Grid,
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
import Header from "../components/Header";
import AddFilmCard from "../components/AddFilmCard";

export default function MoviesScreen() {
    const dispatch = useDispatch();

    const { loading, error, movies, pagination, favoritesToggled } =
        useSelector((state) => state.movies);
    const search = useSelector((state) => state.search);

    useEffect(() => {
        if (!movies?.length || movies?.length < 0) {
            dispatch(getMovies(1));
        }
    }, [dispatch]);

    const paginationButtonClick = (page) => {
        dispatch(getMovies(page));
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box
            position="relative"
            height="100%"
        >
            <Header />
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                maxWidth={"1024px"}
                gap="20px"
                justifyItems="center"
                mx="auto"
            >
                {!favoritesToggled &&
                    !error &&
                    !search &&
                    pagination.currentPage === 1 && <AddFilmCard />}
                {error ? (
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>We are sorry!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    filteredMovies?.map((movie) => (
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
            </Grid>
            {!favoritesToggled && !error && !search && (
                <Wrap
                    spacing="30px"
                    justify="center"
                    p="5"
                    bottom="0"
                    mx="auto"
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
