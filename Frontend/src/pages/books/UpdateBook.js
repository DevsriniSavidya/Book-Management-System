import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

                if (res.data && res.data.length > 0) {
                    const book = res.data[0];
                    setBookData({
                        title: book.title,
                        author: book.author,
                        genre: book.genre,
                        language: book.language,
                        publishDate: book.publishDate,
                        description: book.description,
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
            alert("Book updated successfully!");
            navigate("/ViewBook");
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Failed to update book");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Update Book</h2>

                <input
                    type="text"
                    name="title"
                    value={bookData.title || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={bookData.author || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="genre"
                    value={bookData.genre || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="language"
                    value={bookData.language || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                />
                <input
                    type="date"
                    name="publishDate"
                    value={bookData.publishDate ? bookData.publishDate.split('T')[0] : ''}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={bookData.description || ""}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                ></textarea>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800 transition"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;


