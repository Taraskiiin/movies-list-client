import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddFilmCard = () => {
    return (
        <Box
            _hover={{
                transform: "scale(3)",
                transitionDuration: "0.5s",
            }}
            overflow="hidden"
            p="4"
            as={ReactLink}
            to={`/create`}
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="none"
        >
            <FaPlus
                size="40"
                color="cyan"
            />
        </Box>
    );
};

export default AddFilmCard;
