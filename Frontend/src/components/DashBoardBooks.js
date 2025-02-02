import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8070/api/books");
                setBooks(res.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleViewMore = () => {
        navigate("/displayBook");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white p-6">
            <h2 className="text-3xl font-bold mb-6">Explore Books</h2>
            {books.length === 0 ? (
                <p className="text-gray-700">No books available.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                        {books.slice(0, 4).map((book) => (
                            <div
                                key={book._id}
                                className="bg-white shadow-blue-400 shadow-lg rounded-lg overflow-hidden w-full mb-8"
                            >
                                <img
                                    src={`http://localhost:8070/uploads/${book.image}`}
                                    alt={book.title}
                                    className="w-40 h-60 object-cover mx-auto"
                                />
                                <div className="p-4 text-center">
                                    <h3 className="text-m font-bold">{book.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        onClick={handleViewMore}
                        class="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-sky-300 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-fuchsia-900 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                    >
                        Explore
                        <svg
                            class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                            viewBox="0 0 16 19"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                class="fill-gray-800 group-hover:fill-gray-800"
                            />
                        </svg>
                    </button>

                </>
            )}
        </div>
    );
};

export default DashboardBooks;
