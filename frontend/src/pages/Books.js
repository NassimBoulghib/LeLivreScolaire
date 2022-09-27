import React, { useState, useEffect } from "react";
import axios from "axios";
import { GRAPHQL_API_URL, GET_BOOKS_QUERY } from "../constants";
import Navbar from "../components/Navbar";
import NoCover from "../assets/nocover.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Books = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_BOOKS_QUERY,
            });
            setBooks(response.data.data.viewer.books.hits);
        };
        fetchBooks();
    }, []);

    console.log("books", books);
    return (
        <div>
            <Navbar />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-6 lg:container px-3 mx-auto">
                {books.map((book) => (
                    <div key={book.id} className="w-full">
                        <a
                            className={book.valid ? "" : "pointer-events-none"}
                            href={`/books/${book.id}`}
                        >
                            <div
                                className={
                                    book.valid
                                        ? `flex p-2 relative shadow-md bg-white md:max-w-md h-56 mx-auto rounded-lg overflow-hidden top-0 hover:-top-1 transition duration-150 ease-in-out`
                                        : `flex p-2 shadow-md bg-gray-300 md:max-w-md h-56 mx-auto rounded-lg overflow-hidden`
                                }
                            >
                                <img
                                    className={`w-44 p-4 rounded object-cover bg-[${book.subjects[0]?.color}]`}
                                    src={book.url ? book.url : NoCover}
                                    alt="poster books"
                                />
                                <div className="pl-3 w-full">
                                    <h5 className="text-gray-900 text-sm md:text-base lg:text-xl font-medium mb-8">
                                        {book.displayTitle}
                                    </h5>

                                    <button
                                        type="button"
                                        className={`flex items-center space-x-4 px-6 py-2.5 bg-[${book.subjects[0]?.color}] text-white font-medium text-xs leading-tight rounded shadow-md`}
                                    >
                                        {book.valid ? (
                                            <>
                                                <AiFillEye
                                                    color="white"
                                                    size={20}
                                                />
                                                <span>Voir le manuel</span>
                                            </>
                                        ) : (
                                            <>
                                                <AiFillEyeInvisible
                                                    color="white"
                                                    size={20}
                                                />
                                                <span>Manuel indisponible</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;
