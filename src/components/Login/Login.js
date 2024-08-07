import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import loginCss from "../Login/Login.module.css";

const Login = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");

    useEffect(() => {
        document.body.id = loginCss.homeBody;
        if (Cookies.get("jwtToken")) {
            navigate("/Home");
        }
    }, [navigate]);

    const saveInfo = async () => {
        try {
            const name = document.getElementById("uname").value;
            const email = document.getElementById("email").value;
            const pass = document.getElementById("pass").value;
            document.getElementById("container").innerHTML = "";
            if (name === "" || email === "" || pass === "") {
                document.getElementById("container").innerHTML = "Enter all fields";
            } else {
                const res = await axios.post("https://blogbackend-3-ityn.onrender.com/api/blog/login", { name, email, pass }, {
                    headers: { "Content-Type": "application/json" }
                });
                if (res.data === "exists") {
                    document.getElementById("container").innerHTML = "User already registered, please login.";
                    setAction("Login");
                } else if (res.data === "successful") {
                    setAction("Login");
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const login = async () => {
        try {
            const email = document.getElementById("email").value;
            const pass = document.getElementById("pass").value;
            document.getElementById("container").innerHTML = "";
            if (email === "" || pass === "") {
                document.getElementById("container").innerHTML = "Enter all fields";
            } else {
                const res = await axios.post("https://blogbackend-3-ityn.onrender.com/api/blog/checkLog", { email, pass }, {
                    headers: { "Content-Type": "application/json" }
                });
                if (res.data.logged === "logged") {
                    const tkn = res.data.token;
                    const now = new Date();
                    const time = now.getTime();
                    const expireTime = time + 10000 * 600000;
                    now.setTime(expireTime);
                    document.cookie = "jwtToken=" + tkn + ";expires=" + now.toUTCString();
                    alert("Login successful");
                    setAction("Login");
                    navigate("/Home");
                } else if (res.data === "wrongPass") {
                    document.getElementById("container").innerHTML = "Wrong password";
                } else if (res.data === "notExists") {
                    document.getElementById("container").innerHTML = "No email found, please register";
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const forgotPassword = async () => {
        let otp = parseInt(Math.random() * 100000);
        const mail = document.getElementById("email").value;
        try {
            await axios.post("https://blogbackend-3-ityn.onrender.com/api/blog/generateOtp", { otp, mail }, {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err) {
            console.log(err);
        }
        navigate("/forgotPassword", { state: { mail, otp } });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-inherit">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">{action}</h1>
                    <div className="h-1 w-10 bg-indigo-500 mx-auto mt-2"></div>
                </div>
                <div className="space-y-4">
                    {action === "Login" ? null : (
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <img src="images/person.png" alt="Person Icon" className="h-6 w-6 mr-3" />
                            <input id="uname" type="text" placeholder="Enter your name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required />
                        </div>
                    )}
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <img src="images/email.png" alt="Email Icon" className="h-6 w-6 mr-3" />
                        <input id="email" type="email" placeholder="Enter your Email" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <img src="images/password.png" alt="Password Icon" className="h-6 w-6 mr-3" />
                        <input type="password" id="pass" placeholder="Enter your password" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required />
                    </div>
                </div>
                {action === "Sign Up" ? null : (
                    <div onClick={forgotPassword} className="text-right mt-4 text-sm text-indigo-600 hover:underline cursor-pointer">Forgot password? <span>Click here</span></div>
                )}
                <div id="container" className="text-center text-red-600 font-bold mt-4"></div>
                <div className="flex justify-around mt-6">
                    <div className={`w-1/2 py-2 px-2 m-3 text-center font-bold rounded bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer`} onClick={ ()=>{ setAction("Sign Up"); saveInfo();} }>Sign Up</div>
                    <div className={`w-1/2 py-2 px-2 m-3 text-center font-bold rounded bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer`} onClick={ () => { setAction("Login"); login(); }}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Login;
