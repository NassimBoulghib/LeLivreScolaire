import React from "react";
import { Routes, Route } from "react-router-dom";
import Book from "./pages/Book";
import Books from "./pages/Books";
import Home from "./pages/Home";
import SubjectsBooks from "./pages/SubjectsBooks";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matiere/:slug" element={<SubjectsBooks />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
        </Routes>
    );
};

export default App;
