import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AppNavbar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/books/AddBook";
import DisplayBook from "./pages/books/DisplayBook";
import ViewBook from "./pages/books/ViewBook";
import UpdateBook from "./pages/books/UpdateBook";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged , by looking for a token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setUser({});
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.reload()
    };

    return (
        <Router>
            <AppNavbar user={user} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addBook" element={<AddBook />} />
                <Route path="/displayBook" element={<DisplayBook />} />
                <Route path="/viewBook" element={<ViewBook />} />
                <Route path="/update/:id" element={<UpdateBook />} />
            </Routes>
        </Router>
    );
}

export default App;
