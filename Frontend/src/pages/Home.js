import React from "react";
import DashBoardBooks from "../components/DashBoardBooks";

const Home = () => {


    return (
        <div className="flex flex-col bg-white p-6 m-3">
            <div className="flex">
                <div className="flex-1 p-6">
                    <h1 className=" text-pink-600 text-5xl font-extrabold  hover:text-blue-500 transition duration-300">
                        BookVault
                    </h1>

                    <p className="text-2xl mt-4 font-medium transition-colors duration-300">
                    <span className="text-violet-900 text-4xl hover:text-sky-300 transition-colors duration-300">
                        Welcome
                    </span>{"  "}
                        <span className=" italic text-sky-800 font-italic">
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


                <div className="flex-1 ml-10">
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
