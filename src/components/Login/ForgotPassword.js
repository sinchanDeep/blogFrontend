import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mail = location.state.mail;
    const ootp = location.state.otp;
    alert(ootp);
    const reset = async () => {
        const password = document.getElementById("password").value;
        const cpassword = document.getElementById("cpassword").value;
        const otp = document.getElementById("otp").value;
        
        if (password === "" || cpassword === "" || otp === "") {
            document.getElementById("message").innerHTML = "<h3 style='color:red;font-size:25px'>Please fill all the fields</h3>";
        } else if (password.length < 8 || cpassword.length < 8) {
            document.getElementById("message").innerHTML = "<h3 style='color:red;font-size:25px'>Length of the new passwords must be greater than 8</h3>";
        } else if (password !== cpassword) {
            document.getElementById("message").innerHTML = "<h3 style='color:red;font-size:25px'>Passwords must be matching</h3>";
        } else if (otp == ootp) {
            try {
                await axios.post("https://blogbackend-3-ityn.onrender.com/api/blog/forgotPassword", { password, cpassword, mail }, {
                    headers: { "Content-Type": "application/json" }
                });
                alert("Password has been updated, please login");
                navigate("/Login");
            } catch (err) {
                console.log(err);
            }
        } else {
            document.getElementById("message").innerHTML = "<h3 style='color:red;font-size:25px'>Wrong OTP</h3>";
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <div className="h-1 w-10 bg-indigo-500 mx-auto mt-2"></div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <img src="images/person.png" alt="Person Icon" className="h-6 w-6 mr-3" />
                        <input id="otp" type="text" placeholder="Enter OTP sent to your email" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <img src="images/password.png" alt="Password Icon" className="h-6 w-6 mr-3" />
                        <input id="password" type="password" placeholder="Enter your new password" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <img src="images/password.png" alt="Password Icon" className="h-6 w-6 mr-3" />
                        <input type="password" id="cpassword" placeholder="Retype your new password" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required />
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="w-full py-2 bg-indigo-600 text-white font-bold rounded cursor-pointer hover:bg-indigo-500" onClick={reset}>Reset</div>
                </div>
                <div id="message" className="text-center mt-4 text-red-600 font-bold"></div>
            </div>
        </div>
    )
}

export default ForgotPassword;
