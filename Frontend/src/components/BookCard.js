import React from "react";

const BookCard = ({ book }) => {


    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full flex items-center mb-6">
            <img
                src={`http://localhost:8070/uploads/${book.image}`}
                alt={book.title}
                className="w-42 h-60 object-cover mr-4 ml-2"
            />
            <div className="p-4 flex-1">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-gray-700">By {book.author}</p>
                <p className="text-gray-600 text-sm mt-2">{book.genre}</p>
                <p className="text-gray-600 text-sm mt-2">{book.language}</p>
                <p className="text-gray-500 text-xs mt-2">{new Date(book.publishDate).toDateString()}</p>
                <p className="text-gray-700 mt-2">{book.description}</p>
            </div>
        </div>

    );
};

export default BookCard;
