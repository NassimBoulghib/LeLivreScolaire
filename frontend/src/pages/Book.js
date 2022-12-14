import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import { GET_BOOK_QUERY, GRAPHQL_API_URL } from "../constants";
import Chapters from "../components/Chapters";
import Loading from "../components/Loading";

const Book = () => {
    const { id } = useParams();

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            const response = await axios.post(GRAPHQL_API_URL, {
                query: GET_BOOK_QUERY,
                variables: {
                    ids: id,
                },
            });
            setBook(response.data.data.viewer.books.hits[0]);
            setLoading(false);
        };
        fetchBook();
    }, [id]);

    // console.log("book", book);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Navbar />
            <div className="lg:container mx-auto px-3 py-6">
                <div className="flex flex-col sm:flex-row flex-grow-0 flex-shrink-0 items-stretch justify-start flex-wrap">
                    <div className="relative w-full flex items-center justify-center sm:block sm:w-1/2 lg:w-1/3 flex-grow-0 flex-shrink-0 sm:basis-1/2 lg:basis-1/3 right-auto left-auto">
                        <img
                            className={`w-80 sm:w-auto rounded-lg object-cover px-16 py-10 sm:px-11 sm:py-8 bg-[${book.subjects?.[0].color}]`}
                            src={book.url}
                            alt="cover book"
                        />
                    </div>
                    <div className="relative sm:w-1/2 lg:w-2/3 flex-grow-0 flex-shrink-0 sm:basis-1/2 lg:basis-2/3 sm:pl-3 right-auto left-auto flex flex-col justify-between py-10">
                        <div className="flex justify-center items-center flex-col sm:justify-start sm:items-start space-y-4 pt-3 pb-5">
                            <h1 className="text-3xl">{book.displayTitle}</h1>
                            <h2 className="text-slate-400 uppercase">
                                Collection {book.year}
                            </h2>
                        </div>
                        <div>
                            <button
                                className={`relative top-0 hover:-top-1 transition-all inline-flex justify-center items-center w-full sm:w-1/2 p-2 space-x-2 text-black font-medium text-xs leading-tight rounded shadow-md bg-[${book.subjects?.[0].color}]`}
                            >
                                <AiFillEye size={20} color="black" />
                                <span>Manuel num??rique</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-50">
                <Chapters id={id} />
            </div>
        </div>
    );
};

export default Book;
