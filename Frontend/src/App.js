import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddBook from "./pages/books/AddBook";
import DisplayBook from "./pages/books/DisplayBook";
import ViewBook from "./pages/books/ViewBook";
import UpdateBook from "./pages/books/UpdateBook";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/addBook" element={<AddBook />} />
                <Route path="/displayBook" element={<DisplayBook />} />
                <Route path={"/viewBook"} element={<ViewBook />} />
                <Route path="/update/:id" element={<UpdateBook />} />
            </Routes>
        </Router>
    );
}

export default App;
