import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import MoviesScreen from "./screens/MoviesScreen";
import MovieScreen from "./screens/MovieScreen";
import CreateScreen from "./screens/CreateScreen";
import EditScreen from "./screens/EditScreen";

function App() {
    return (
        <ChakraProvider>
            <Router>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<MoviesScreen />}
                        />
                        <Route
                            path="/movie/:id"
                            element={<MovieScreen />}
                        />
                        <Route
                            path="/create"
                            element={<CreateScreen />}
                        />
                        <Route
                            path="/edit/:id"
                            element={<EditScreen />}
                        />
                    </Routes>
                </main>
            </Router>
        </ChakraProvider>
    );
}

export default App;
