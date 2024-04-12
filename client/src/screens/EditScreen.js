import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    VStack,
} from "@chakra-ui/react";

import { updateMovie, getMovie } from "../redux/actions/movies";

export default function EditScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { movie } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getMovie(id));
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        title: movie.title || "",
        description: movie.description || "",
        rating: movie.rating || "",
        release_date: movie.release_date || "",
        genre: movie.genre || [],
        actors: movie.actors || [],
        director: movie.director || "",
        image: movie.image || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGenreChange = (e) => {
        const { value } = e.target;
        const genreArray = value.split(",");
        setFormData({
            ...formData,
            genre: genreArray,
        });
    };

    const handleActorsChange = (e) => {
        const { value } = e.target;
        const actorsArray = value.split(",");
        setFormData({
            ...formData,
            actors: actorsArray,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMovie(id, formData));
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack
                spacing="4"
                maxWidth="1024px"
                mx="auto"
                p="20px"
            >
                <FormControl>
                    <FormLabel>Title:</FormLabel>
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description:</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Rating:</FormLabel>
                    <Input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Release Date:</FormLabel>
                    <Input
                        type="date"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Genre:</FormLabel>
                    <Input
                        type="text"
                        name="genre"
                        value={formData.genre.join(",")}
                        onChange={handleGenreChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Actors (comma-separated):</FormLabel>
                    <Input
                        type="text"
                        name="actors"
                        value={formData.actors.join(",")}
                        onChange={handleActorsChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Director:</FormLabel>
                    <Input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Image URL:</FormLabel>
                    <Input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button type="submit">Submit</Button>
            </VStack>
        </form>
    );
}
