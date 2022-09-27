import React, { useState, useEffect } from "react";
import axios from "axios";
import { GRAPHQL_API_URL, GET_SUBJETCS_QUERY } from "../constants";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const toSubjectsBooks = (slug, id, name, url) => {
        navigate(`/${slug}`, { state: { id, name, url } });
    };

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
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
    }, []);

    subjects.sort((a, b) => a.id - b.id);
    console.log("subjects", subjects);

    return (
        <div>
            <Navbar />
            <div className="lg:container mx-auto gap-4 px-3 py-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {subjects.map((subject) => (
                    <div
                        onClick={() =>
                            toSubjectsBooks(
                                subject.slug,
                                subject.id,
                                subject.name,
                                subject.url
                            )
                        }
                        className="shadow-slate-400 shadow-lg flex xl:flex-col justify-center items-center h-[100px] xl:h-52 py-0 px-6 text-center overflow-hidden rounded-lg hover:scale-105 duration-[400ms] ease-in-out cursor-pointer"
                        key={subject.id}
                    >
                        <h3 className=" flex-grow-[9] flex-shrink basis-[0%] text-[#55779E] font-bold pt-3">
                            <span>{subject.name}</span>
                        </h3>
                        <img
                            src={subject.url}
                            alt="cover subjects"
                            className="h-[100px] xl:h-40 flex-grow-[6] flex-shrink basis-[0%]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
