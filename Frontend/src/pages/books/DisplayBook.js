import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";

//Explore Book Collection
const DisplayBook = () => {
    const [books, setBooks] = useState([]);

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
    return (
        <div className="flex flex-col items-center min-h-screen bg-sky-200 p-6" style={{ backgroundImage: "url('/images/BackPhoto.jpg')" }}>

            <h2 className="text-3xl font-bold mb-6">Explore Books</h2>
            {books.length === 0 ? (
                <p className="text-gray-700">No books found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DisplayBook;
