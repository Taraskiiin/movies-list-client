import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    VStack,
} from "@chakra-ui/react";

import { createMovie } from "../redux/actions/movies";

export default function CreateScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rating: "",
        release_date: "",
        genre: [],
        actors: [],
        director: "",
        image: "",
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
        dispatch(createMovie(formData));
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
