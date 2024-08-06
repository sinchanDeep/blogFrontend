import React from 'react'
import { useLocation } from 'react-router-dom';
import loginCss from '../Login/Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const mail=location.state.mail;
    const ootp=location.state.otp;
    console.log(ootp);
    const reset=()=>{
        const password=document.getElementById("password").value;
        const cpassword=document.getElementById("cpassword").value;
        const otp=document.getElementById("otp").value;
        if(password=="" || cpassword=="" || otp=="")
        {
            document.getElementById("message").innerHTML="<h3 style='color:red;font-size:25px'>Please fill all the fields</h3>";
        }else if(password.length<8 || cpassword.length<8)
        {
            document.getElementById("message").innerHTML="<h3 style='color:red;font-size:25px'>Length of the new passwords must be greater than 8</h3>";
        }
        else if(password!=cpassword){
            document.getElementById("message").innerHTML="<h3 style='color:red;font-size:25px'>Passwords must be matching</h3>";
        }
        
        else if(otp==ootp)
        {
            try{
                axios({
                    headers:{"Content-Type":"application/json"},
                    method:"POST",
                    url:"https://blogbackend-3-ityn.onrender.com/api/blog/forgotPassword",
                    data:{
                        password,
                        cpassword,
                        mail
                    }
                }).then((res)=>{
                    console.log("");
                });    
            }catch(err){
                console.log("");
            }
            alert("password has updated please login");
            navigate("/");
        }
        else{
            document.getElementById("message").innerHTML="<h3 style='color:red;font-size:25px'>wrong otp</h3>";
        }
    }
 
    return (
    <>
        <div className={loginCss.container}>
            <div className={loginCss.header}>
            <div className={loginCss.text}>Reset Password</div>
            <div className={loginCss.underline}></div>
            </div>
            <div className={loginCss.inputs}>
            <div className={loginCss.input}>
                <img src="images/person.png" />
                <input id="otp" type="text" placeholder="Enter otp sent to your email" required/>
            </div>
            <div className={loginCss.input}>
                <img src="images/password.png" />
                <input id="password" type="password" placeholder="Enter your new password" required/>
            </div>
            <div className={loginCss.input}>
                <img src="images/password.png" />
                <input type="password" id="cpassword" placeholder="Retype your new password" required/>
            </div>
           
        </div>
        <div className={loginCss.submitContainer}>
            <div className={loginCss.submit} onClick={reset}>Reset</div>
        </div>
        <div id="message" className='text-center'></div>
       
        </div>
    </>
  )
}

export default ForgotPassword
