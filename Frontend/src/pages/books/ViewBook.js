import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewBook = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserBooks = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login"); // Redirect to login page if not authenticated
                return;
            }

            try {
                const res = await axios.get("http://localhost:8070/api/books/user", {
                    headers: { Authorization: token },
                });
                setBooks(res.data);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        };

        fetchUserBooks();
    }, [navigate]);

    const handleUpdateClick = (bookId) => {
        navigate(`/update/${bookId}`);
    };

    const handleDeleteClick = (bookId) => {
        axios
            .delete(`http://localhost:8070/api/books/${bookId}`, {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then(() => {
                setBooks(books.filter((book) => book._id !== bookId)); // Remove the book from the list
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
            });
    };

    return (

        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6">My Books</h2>
            {books.length === 0 ? (
                <p className="text-gray-700">No books found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full flex p-4">
                            {/* Image Section */}
                            <img
                                src={`http://localhost:8070/uploads/${book.image}`}
                                alt={book.title}
                                className="w-32 h-48 object-cover mr-4 rounded-lg"
                            />
                            {/* Book Details Section */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">{book.title}</h3>
                                    <p className="text-gray-700">By {book.author}</p>
                                    <p className="text-gray-600 text-sm mt-2">{book.genre}</p>
                                    <p className="text-gray-500 text-xs mt-2">{new Date(book.publishDate).toDateString()}</p>
                                    <p className="text-gray-700 mt-2">{book.description}</p>
                                </div>

                                <div className="mt-2 flex flex-row space-x-4 justify-end">
                                    <button
                                        onClick={() => handleUpdateClick(book._id)}
                                        className="bg-blue-500 text-white p-2 rounded-md w-24 text-center">
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(book._id)}
                                        className="bg-red-500 text-white p-2 rounded-md w-24 text-center">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default ViewBook;




