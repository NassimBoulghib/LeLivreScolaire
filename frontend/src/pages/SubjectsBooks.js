import React from "react";
import { useParams } from "react-router-dom";

const SubjectsBooks = () => {
    const { slug } = useParams();

    return (
        <div>
            <h1>{slug}</h1>
        </div>
    );
};

export default SubjectsBooks;
