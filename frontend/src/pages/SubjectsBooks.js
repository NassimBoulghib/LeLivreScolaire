import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GRAPHQL_API_URL, GET_SUBJECTS_FROM_BOOK } from "../constants";
import NoCover from "../assets/nocover.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const SubjectsBooks = () => {
    const { state } = useLocation();

    // console.log("state", state);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_SUBJECTS_FROM_BOOK,
                variables: {
                    subjectIds: [state.id],
                },
            });
            setBooks(response.data.data.viewer.books.hits);
            setLoading(false);
        };
        fetchBooks();
    }, [state.id]);

    // console.log("books", books);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Navbar />
            <div className="py-8">
                <div className="flex justify-center items-center lg:container px-3 mx-auto bg-gradient-to-r from-blue-100 via-blue-400 to-blue-900 py-12 h-[250px] rounded-lg">
                    <div className="relative h-[150px] w-[150px] mr-[60px]">
                        <div className="absolute w-[140px] h-[140px] bg-white top-1 left-1 rounded-full z-10"></div>
                        <img
                            src={state.url}
                            alt="cover subject"
                            className="absolute w-[150px] top-0 left-0 z-20"
                        />
                    </div>
                    <div>
                        <h1>{state.name}</h1>
                    </div>
                </div>
            </div>
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
                                    className={`w-44 p-4 rounded object-cover bg-[${book.subjects?.[0].color}]`}
                                    src={book.url ? book.url : NoCover}
                                    alt="poster books"
                                />
                                <div className="pl-3 w-full">
                                    <h5 className="text-gray-900 text-sm md:text-base lg:text-xl font-medium mb-8">
                                        {book.displayTitle}
                                    </h5>

                                    <button
                                        type="button"
                                        className={`flex items-center space-x-4 px-6 py-2.5 bg-[${book.subjects?.[0].color}] text-black font-medium text-xs leading-tight rounded shadow-md`}
                                    >
                                        {book.valid ? (
                                            <>
                                                <AiFillEye
                                                    color="black"
                                                    size={20}
                                                />
                                                <span>Voir le manuel</span>
                                            </>
                                        ) : (
                                            <>
                                                <AiFillEyeInvisible
                                                    color="black"
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

export default SubjectsBooks;
