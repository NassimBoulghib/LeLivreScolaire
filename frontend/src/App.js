import React from "react";
import { Routes, Route } from "react-router-dom";
import Book from "./pages/Book";
import Books from "./pages/Books";

const App = () => {
    return (
        <Routes>
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
        </Routes>
    );
};

export default App;
