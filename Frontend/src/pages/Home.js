import React from "react";
import DashBoardBooks from "../components/DashBoardBooks";

const Home = () => {


    return (
        <div className="flex flex-col bg-white p-6 m-3">
            <div className="flex flex-wrap items-center">
                <div className="flex-1 p-6">
                    <p className="text-6xl mt-4 font-extrabold transition-colors duration-300">
                    <span className="text-fuchsia-900 hover:text-sky-700 "  style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>
                        Book
                    </span>
                        <span className=" text-pink-600 " style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.7)" }}>
                        Vault
                    </span>
                    </p>
                    <p className="text-2xl mt-4 font-medium ">
                    <span className="text-violet-900 text-4xl drop-shadow-2xl hover:text-teal-900 transition-colors duration-300">
                        Welcome
                    </span>{"  "}
                        <span className=" italic text-sky-800 ">
                        to Your Digital Bookshelf!
                    </span>
                    </p>

                    <p className="italic text text-lg mt-16 ">
                        Discover, organize, and manage your book collection with ease.
                    </p>
                    <p className="italic text text-lg font-semibold">
                        Start by signing in to access all features.
                    </p>
                </div>


                <div className="w-full md:w-1/2 p-4">
                    <img
                        src="/books.png"
                        alt="Home"
                        className="w-full h-80 object-cover rounded-lg"
                    />
                </div>
            </div>

            <hr className="border-cyan-800 border-4 rounded "/>

            <DashBoardBooks />
        </div>


    );
};

export default Home;
