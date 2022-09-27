import React, { useState, useEffect } from "react";
import axios from "axios";
import { GRAPHQL_API_URL, GET_CHAPTERS_FROM_BOOK } from "../constants";

const Chapters = ({ id }) => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
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
    }, [id]);

    chapters.sort((a, b) => a.number - b.number);
    console.log("chapters", chapters);

    return (
        <>
            <div className="w-full text-center text-2xl text-blue-300 py-5 bg-white">
                <h1>Chapitres</h1>
            </div>
            <ul className="lg:container px-3 py-5 mx-auto">
                {chapters.map((chapter) => (
                    <li className="mb-5">
                        <div className="flex items-center justify-between p-8 bg-white shadow-md h-40 font-normal rounded-lg">
                            <img
                                src={chapter.url}
                                alt="chapter cover"
                                className="w-[150px] h-[100px] rounded-lg mr-5"
                            />
                            <div className="flex flex-col justify-between flex-grow">
                                <h4>{chapter.title}</h4>
                                <div className="w-10 bg-blue-300 h-[2px]"></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Chapters;
