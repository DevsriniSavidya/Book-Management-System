import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBook = ()    => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        language: "",
        publishDate: "",
        description: "",
        image: null
    });
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!id) {
                    console.error("Book ID is missing");
                    return;
                }
                if (!token) {
                    alert("Unauthorized. Please log in.");
                    navigate("/login");
                    return;
                }

                const res = await axios.get(`http://localhost:8070/api/books/${id}`, {
                    headers: { Authorization: token }
                });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    const book = res.data.find(book => book._id === id) || res.data[0];

                    setBookData({
                        title: book.title || "",
                        author: book.author || "",
                        genre: book.genre || "",
                        language: book.language || "",
                        publishDate: book.publishDate ? book.publishDate.split('T')[0] : "",
                        description: book.description || "",
                        image: null
                    });
                } else {
                    console.error("Book data not found");
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
                alert("Failed to load book details");
            }
        };

        fetchBook();
    }, [id, navigate]);

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
            // Append all fields from bookData to FormData
            for (const key in bookData) {
                // If image is null, don't append it
                if (key === "image" && bookData[key] === null) continue;
                formData.append(key, bookData[key]);
            }

            await axios.put(`http://localhost:8070/api/books/${id}`, formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                title: "Book updated successfully!",
                icon: "success",
                draggable: true
            });
            navigate("/ViewBook");
        } catch (error) {
            console.error("Error updating book:", error);
            Swal.fire("Failed to update book");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen  p-6" style={{ backgroundImage: "url('/images/BackPhoto.jpg')" }}>
            <form key={id} onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[400px]">

                <h2 className="text-2xl font-bold text-center mb-6">Update Book</h2>

                <div className="flex justify-center mb-4">
                    <img src="/images/editbook.png"
                         alt="Edit Book"
                         className="w-40 h-40 object-contain" />
                </div>


                <label className="block text-gray-700  mb-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={bookData.title || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

                <label className="block text-gray-700 mb-2">Author: </label>
                <input
                    type="text"
                    name="author"
                    value={bookData.author || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

                <label className="block text-gray-700 mb-2">Genre:</label>
                <input
                    type="text"
                    name="genre"
                    value={bookData.genre || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

                <label className="block text-gray-700 mb-2">Language: </label>
                <input
                    type="text"
                    name="language"
                    value={bookData.language || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                />

                <label className="block text-gray-700 mb-2">Date: </label>
                <input
                    type="date"
                    name="publishDate"
                    value={bookData.publishDate ? bookData.publishDate.split('T')[0] : ''}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

                <label className="block text-gray-700 mb-2">Description:</label>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={bookData.description || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

                <label className="block text-gray-700 mb-2">Book Cover: </label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                />

                <button type="submit"
                        className="w-full mt-6 px-6 py-3 font-bold text-white bg-sky-950 rounded-lg hover:bg-slate-700 transition">
                    Update Book
                </button>

                <button type="button" onClick={() => navigate(-1)} className="mt-4 w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-800 transition">
                    Back
                </button>

            </form>
        </div>
    );
};

export default UpdateBook;


