import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8070/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            console.log("Worked");
            // navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-cover"
            style={{ backgroundImage: "url('/SkyImage.jpg')" }}>

            {/* Image Card */}
            <div className="hidden md:block w-[400px] p-6 bg-white shadow-lg rounded-l-lg border-r-2 border-sky-900" >
                <img src="/login_clip_art.jpg" alt="Login Img" className="w-full rounded-md" />
                <p className="mt-5 text-center text-gray-700 font-semibold">
                    Welcome to Our Platform!
                </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="bg-white p-10 w-[400px] rounded-r-lg shadow-lg">
                <h2 className="text-center text-3xl font-bold mb-6">Login</h2>

                <input
                    type="email"
                    className="text-sm mt-4 p-3 block w-full rounded-lg border border-gray-300 focus:border-sky-800 focus:outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="text-sm mt-4 p-3 block w-full rounded-lg border border-gray-300 focus:border-sky-800 focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="text-center">
                    <button
                        className="w-full mt-6 px-6 py-3 font-bold text-white bg-gray-900 rounded-lg hover:bg-slate-700 transition"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>

                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <a className="font-bold text-sky-800 hover:underline" href={Register}>
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;