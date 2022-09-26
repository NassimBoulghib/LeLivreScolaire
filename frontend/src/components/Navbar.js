import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow">
            <nav className="flex items-center justify-between flex-wrap lg:container px-3 py-4 mx-auto">
                <div className="flex items-center flex-shrink-0 text-white">
                    <img className="w-44" src={logo} alt="logo" />
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="flex items-center px-3 py-2 border rounded text-black"
                    >
                        {navbarOpen ? (
                            <FaTimes color="grey" size={"1.5rem"} />
                        ) : (
                            <FaBars color="grey" size={"1.5rem"} />
                        )}
                    </button>
                </div>
                <div
                    className={`w-full md:flex md:items-center md:w-auto pt-6 md:pt-0 md:justify-between ${
                        navbarOpen ? "block" : "hidden"
                    }`}
                >
                    <div className="text-sm md:flex-grow">
                        <span className="peer">Manuel numérique</span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
