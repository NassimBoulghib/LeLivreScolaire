import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    GRAPHQL_API_URL,
    GET_BOOKS_QUERY,
    GET_CHAPTERS_FROM_BOOK,
} from "./constants";

const App = () => {
    const id = 1339497;
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_BOOKS_QUERY,
            });
            setBooks(response.data.data.viewer.books.hits);
        };
        fetchBooks();

        const fetchChapters = async () => {
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_CHAPTERS_FROM_BOOK,
                variables: {
                    bookId: id,
                },
            });
            setChapters(response.data.data.viewer.chapters.hits);
        };
        fetchChapters();
    }, []);

    console.log("books", books);
    console.log("chapters", chapters);
    return (
        <div>
            <h1>App</h1>
        </div>
    );
};

export default App;
