import React from 'react'
import loginCss from '../Login/Login.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        if(Cookies.get("jwtToken"))
            navigate("/Home");
    },[])
    const [action,setAction]=useState("Sign Up");
   
    const saveInfo=()=>{
        try{
        const name=document.getElementById("uname").value;
        const email=document.getElementById("email").value;
        const pass=document.getElementById("pass").value;
        document.getElementById("container").innerHTML="";
        if(name=="" || email=="" || pass=="")
        {
            
           document.getElementById("container").innerHTML="Enter all fields";
        }
        else
        {
            axios({
                headers:{"Content-Type":"application/json"},
                method:"POST",
                url:"https://blogbackend-3-ityn.onrender.com//api/blog/login",
                data:{
                    name,
                    email,
                    pass
                }
            }).then((res)=>{
                if(res.data=="exists")
                {
                    document.getElementById("container").innerHTML="user already registered please login";
                    setAction("Login");
                }
                else if(res.data=="successful")
                {
                    setAction("Login");
                }
            })
        }
    }catch(err)
    {
        console.log(err);
        //throw err;
    }
    }

    const login=()=>{
        try{
        //const name=document.getElementById("uname").value;
        const name="";
        const email=document.getElementById("email").value;
        const pass=document.getElementById("pass").value;
        document.getElementById("container").innerHTML="";
        if(email=="" || pass=="")
        {           
           document.getElementById("container").innerHTML="Enter all fields";
        }
        else
        {
            axios({
                headers:{"Content-Type":"application/json"},
                method:"POST",
                url:"https://blogbackend-3-ityn.onrender.com/api/blog/checkLog",
                data:{
                    email,
                    pass
                }
            }).then((res)=>{
                if(res.data.logged=="logged")
                {
                    var tkn=res.data.token;
                    var now=new Date();
                    var time=now.getTime();
                    var expireTime=time+10000*600000;
                    now.setTime(expireTime);
                    
                    document.cookie="jwtToken = "+tkn+";expires="+now.toUTCString();
                    alert("login successful");
                    setAction("Login");
                    
                    navigate("/Home");
                    
                }
                else if(res.data=="wrongPass")
                {
                    document.getElementById("container").innerHTML="wrong password";
                }
                else if(res.data=="notExists")
                {
                    document.getElementById("container").innerHTML="no email found please register";
                }
            })
        }
    }catch(err)
    {
        throw err;
    }
    }
    const forgotPassword=()=>{
        let otp = parseInt(Math.random() * 100000);
        const mail=document.getElementById("email").value;
        try{
            axios({
                headers:{"Content-Type":"application/json"},
                method:"POST",
                url:"https://blogbackend-3-ityn.onrender.com/api/blog/generateOtp",
                data:{
                    otp,
                    mail
                }
            }).then((res)=>{            
              console.log("");
            });
        }catch(err)
        {
            console.log("");
        }
        navigate("/forgotPassword",{state:{mail:mail,otp:otp}});
    }
   
  return (
    <div className={loginCss.container}>
        <div className={loginCss.header}>
            <div className={loginCss.text}>{action}</div>
            <div className={loginCss.underline}></div>
        </div>
        <div className={loginCss.inputs}>
            {action=="Login"?<div></div>:  <div className={loginCss.input}>
                <img src="images/person.png" />
                <input id="uname" type="text" placeholder="Enter your name" required/>
            </div>}
           
            <div className={loginCss.input}>
                <img src="images/email.png" />
                <input id="email" type="email" placeholder="Enter your Email" required/>
            </div>
            <div className={loginCss.input}>
                <img src="images/password.png" />
                <input type="password" id="pass" placeholder="Enter your password" required/>
            </div>
        </div>
        {action=="Sign Up"?<div></div>: <div onClick={forgotPassword} className={loginCss.forgotPassword}>forgot password? <span>Click here</span></div>}
        
        <div className={loginCss.submitContainer}>
            <div className={action==="Login"?loginCss.submit+" "+loginCss.gray:loginCss.submit} onClick={()=>{setAction("Sign Up"); saveInfo();}}>Sign up</div>
            <div className={action==="Sign Up"?loginCss.submit+" "+loginCss.gray:loginCss.submit} onClick={()=>{setAction("Login"); login();}}>Login</div>
        </div>
        <div className="self-center" id="container" style={{color:"red",fontWeight:"700"}}>
           
        </div>
    </div>
  )
}

export default Login
