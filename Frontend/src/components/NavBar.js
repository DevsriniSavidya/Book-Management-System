import { Link } from "react-router-dom";

const AppNavbar = ({ user, handleLogout }) => {

    return (
        <nav className="bg-sky-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-sm">
                    <img
                        src="/BookLogo.jpg"
                        alt="Logo"
                        className="h-10 w-13"
                    />
                    <span className="text text-2xm font-bold">
        BookVault
    </span></Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            <Link to="/" className=" hover:text-pink-500 transition duration-300">Home</Link>
                            <Link to="/addBook" className="text-white hover:text-pink-500 transition duration-300">Add Book</Link>
                            <Link to="/viewBook" className="text-white hover:text-pink-500 transition duration-300">My Collection</Link>
                            <button onClick={handleLogout} className="text-white hover:text-pink-500 transition duration-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className=" hover:text-pink-500 transition duration-300">Home</Link>
                            <Link to="/login" className="text-white hover:text-pink-500 transition duration-300">Login</Link>
                            <Link to="/register" className="text-white hover:text-pink-500 transition duration-300">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;

