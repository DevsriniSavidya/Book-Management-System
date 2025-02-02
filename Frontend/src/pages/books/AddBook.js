import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
                Swal.fire("Unauthorized!", "Please log in to continue.", "error");
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

            Swal.fire({
                title: "Success!",
                text: "Book added successfully!",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                navigate("/viewBook");
            });

        } catch (error) {
            console.error("Error adding book:", error);
            Swal.fire("Error!", "Failed to add book", "error");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-sky-200 p-6" style={{ backgroundImage: "url('/images/BackPhoto.jpg')" }}>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Add a New Book</h2>


                <div className="flex justify-center mb-4">
                    <img
                        src="./images/addBook.jpg"
                        alt="Add New Book"
                        className="w-40 h-40 object-contain"
                    />
                </div>



                <input type="text" name="title" placeholder="Title" value={bookData.title} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <input type="text" name="author" placeholder="Author" value={bookData.author} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <input type="text" name="genre" placeholder="Genre" value={bookData.genre} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <input type="text" name="language" placeholder="Language" value={bookData.language} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" />

                <label className="block text-gray-700 mb-2">Publication date: </label>
                <input type="date" name="publishDate" value={bookData.publishDate} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
                <textarea name="description" placeholder="Description" value={bookData.description} onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required></textarea>

                <label className="block text-gray-700 mb-2">Add Book Cover: </label>
                <input type="file" name="image" onChange={handleFileChange} className="w-full p-3 mb-4 border rounded-lg" required />

                <button type="submit" className="w-full bg-sky-950 text-white p-3 rounded-lg hover:bg-blue-800 transition">
                    Add Book
                </button>

                <button type="button" onClick={() => navigate(-1)} className="mt-4 w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-800 transition">
                    Back
                </button>
            </form>
        </div>
    );
};

export default AddBook;
