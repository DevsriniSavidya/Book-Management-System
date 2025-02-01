import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        language: "",
        publishDate: "",
        description: "",
        image: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setBookData({ ...bookData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized. Please log in.");
                navigate("/login");
                return;
            }

            const formData = new FormData();
            for (const key in bookData) {
                formData.append(key, bookData[key]);
            }

            await axios.post("http://localhost:8070/api/books/add", formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Book added successfully!");
            navigate("/displayBook");
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Add a New Book</h2>

                <input type="text" name="title" placeholder="Title" value={bookData.title} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <input type="text" name="author" placeholder="Author" value={bookData.author} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <input type="text" name="genre" placeholder="Genre" value={bookData.genre} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <input type="text" name="language" placeholder="Language" value={bookData.language} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" />
                <input type="date" name="publishDate" value={bookData.publishDate} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <textarea name="description" placeholder="Description" value={bookData.description} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required></textarea>
                <input type="file" name="image" onChange={handleFileChange} className="w-full p-3 mb-4 border rounded-lg" required />

                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800 transition">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;