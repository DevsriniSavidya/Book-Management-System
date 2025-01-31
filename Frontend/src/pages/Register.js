import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = ()=>{
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate  =useNavigate();

    const handeRegister = async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8070/api/auth/register",{userName,email,password});
            navigate("/login");


        }catch (error){
            alert("Registration Failed!")
        }
    }
    return(
        <div
            className="flex justify-center items-center h-screen bg-cover"
            style={{ backgroundImage: "url('/SkyImage.jpg')" }}>

            {/* Image Card */}
            <div className="hidden md:block w-[400px] p-6 bg-white shadow-lg rounded-l-lg border-r-2 border-sky-900" >
                <img src="/RegisterClip.jpg" alt="Register Img" className="w-full rounded-md" />
                <p className="mt-21 text-center text-gray-700 font-semibold">
                    Welcome to Our Platform!
                </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handeRegister} className="bg-white p-10 w-[400px] rounded-r-lg shadow-lg">
                <h2 className="text-center text-3xl font-bold mb-8">Register</h2>

                <input
                    type="userName"
                    className="text-sm mt-4 p-3 block w-full rounded-lg border border-gray-300 focus:border-sky-800 focus:outline-none"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />

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
                        Sign Up
                    </button>
                </div>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <span className="font-bold text-sky-800 hover:underline" onClick={() => navigate("/login")}>
                        Sign in
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Register;