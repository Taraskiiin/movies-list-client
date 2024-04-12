import React, { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
    Box,
    Image,
    Text,
    Badge,
    Skeleton,
    IconButton,
    Stack,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { getMovie } from "../redux/actions/movies";

export default function MovieScreen() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { movie } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getMovie(id));
    }, [dispatch, id]);

    return (
        <>
            {movie ? (
                <Skeleton isLoaded={movie}>
                    <Box
                        maxW="md"
                        overflow="hidden"
                        padding="5"
                        mx="auto"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap="20px"
                        minHeight="100vh"
                        maxWidth="1024px"
                    >
                        {movie?.image && (
                            <Image
                                src={movie.image}
                                alt={movie.title}
                                fallbackSrc="https://via.placeholder.com/400"
                                h="100%"
                                w="250px"
                                objectFit="fill"
                            />
                        )}

                        <Box p="6">
                            <Stack
                                w="100%"
                                flexDirection="row"
                                justifyContent="space-between"
                                display="flex"
                                mb="10"
                            >
                                <IconButton
                                    icon={<IoMdArrowRoundBack size={20} />}
                                    as={ReactLink}
                                    colorScheme="cyan"
                                    to="/"
                                    aria-label={""}
                                />
                                <IconButton
                                    icon={<MdEdit size={20} />}
                                    as={ReactLink}
                                    colorScheme="yellow"
                                    to={`/edit/${id}`}
                                    aria-label={""}
                                />
                            </Stack>
                            <Box
                                d="flex"
                                alignItems="baseline"
                            >
                                <Badge
                                    borderRadius="full"
                                    px="2"
                                    colorScheme="teal"
                                >
                                    {movie.genre.join(", ")}
                                </Badge>
                                <Text
                                    ml="2"
                                    textTransform="uppercase"
                                    fontSize="sm"
                                    fontWeight="bold"
                                    color="teal.800"
                                >
                                    Rating: {movie.rating}
                                </Text>
                            </Box>

                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                {movie.title}
                            </Box>

                            <Box>
                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    Director: {movie.director}
                                </Text>
                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    Release Date: {movie.release_date}
                                </Text>
                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    Actors: {movie.actors.join(", ")}
                                </Text>
                            </Box>

                            <Box mt="2">
                                <Text
                                    color="gray.600"
                                    fontSize="sm"
                                >
                                    {movie.description}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Skeleton>
            ) : (
                <></>
            )}
        </>
    );
}
