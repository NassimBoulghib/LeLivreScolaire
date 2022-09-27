import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    GRAPHQL_API_URL,
    GET_BOOKS_QUERY,
    GET_SUBJETCS_QUERY,
    GET_LEVELS_QUERY,
} from "../constants";
import Navbar from "../components/Navbar";
import NoCover from "../assets/nocover.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [levels, setLevels] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [levelFilter, setLevelFilter] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_BOOKS_QUERY,
            });
            setBooks(response.data.data.viewer.books.hits);
        };
        fetchBooks();

        const fetchSubjects = async () => {
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_SUBJETCS_QUERY,
                variables: {
                    ids: [
                        262, 261, 275, 274, 272, 276, 271, 270, 273, 6066667,
                        12624722, 17310596,
                    ],
                },
            });
            setSubjects(response.data.data.viewer.subjects.hits);
        };
        fetchSubjects();

        const fetchLevels = async () => {
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_LEVELS_QUERY,
            });
            setLevels(response.data.data.viewer.levels);
        };
        fetchLevels();
    }, []);

    // console.log("books", books);
    // console.log("levels", levels);
    // console.log("subjects", subjects);
    // console.log("levelFilter", levelFilter);
    // console.log("subjectFilter", subjectFilter);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const search = (books) => {
        if (subjectFilter !== "" && levelFilter !== "") {
            return books.filter(
                (book) =>
                    book.subjects?.[0]?.name.includes(subjectFilter) &&
                    book.levels?.[0]?.name.includes(levelFilter) &&
                    book.displayTitle
                        ?.toLowerCase()
                        ?.includes(searchTerm.toLowerCase())
            );
        } else if (levelFilter !== "") {
            return books.filter(
                (book) =>
                    book.levels?.[0]?.name.includes(levelFilter) &&
                    book.displayTitle
                        ?.toLowerCase()
                        ?.includes(searchTerm.toLowerCase())
            );
        } else if (subjectFilter !== "") {
            return books.filter(
                (book) =>
                    book.subjects?.[0]?.name.includes(subjectFilter) &&
                    book.displayTitle
                        ?.toLowerCase()
                        ?.includes(searchTerm.toLowerCase())
            );
        } else {
            return books.filter((book) =>
                book.displayTitle
                    ?.toLowerCase()
                    ?.includes(searchTerm.toLowerCase())
            );
        }
    };

    // console.log("filteredBooks", search(books));

    return (
        <div>
            <Navbar />

            <div className="mx-auto px-8 py-5 flex flex-col items-center max-w-5xl">
                <div className="flex w-full space-x-5 pb-4">
                    <select
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="w-1/2 p-4 shadow-md bg-white text-slate-700 outline-none border border-gray-400 focus:border-blue-300 focus:border"
                    >
                        <option value="">Matière</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.name}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="w-1/2 p-4 shadow-md bg-white text-slate-700 outline-none border border-gray-400 focus:border-blue-300 focus:border"
                    >
                        <option value="">Niveau</option>
                        {levels.map((level) => (
                            <option key={level.name} value={level.name}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Titre du livre"
                    className="w-full p-4 shadow-md bg-white text-slate-700 outline-none border border-gray-400 focus:border-blue-300 focus:border"
                    onChange={handleSearchTerm}
                />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-6 lg:container px-3 mx-auto">
                {search(books).map((book) => (
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
                                        className={`flex items-center space-x-4 px-6 py-2.5 bg-[${book.subjects[0]?.color}] text-black font-medium text-xs leading-tight rounded shadow-md`}
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

export default Books;
