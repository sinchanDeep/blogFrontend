import React, { useState } from 'react'
import navCss from "../Navbar/Navbar.module.css";
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"


const Navbar = () => {
  const navigate=useNavigate();
  let [login,setLogin]=useState("notlogged");
  useState(()=>{
    if(Cookies.get("jwtToken"))
      setLogin("logged");
    else
    setLogin("notLogged");

  },[])
  const logOut=()=>{
    if(window.confirm("do you want to logout ?")){
      Cookies.remove("jwtToken");
      window.location.reload();
      navigate("/");
    }
  }
  const openMyBlogs=()=>{
    if(!Cookies.get("jwtToken"))
      navigate("/Login");
    else
    navigate("/myBlogs")
  }


  return (
    <>
      <div className={navCss.container}>
        <div className={navCss.headers}>
          <div className="flex flex-row gap-5" id={navCss.elements}>
            <div onClick={openMyBlogs} style={{cursor:"pointer"}}>My Blogs</div>
            <Link to="/">Home</Link>
            {login==="logged"?<div  style={{cursor:"pointer"}} onClick={logOut}>Log Out</div>:<div  style={{cursor:"pointer"}} onClick={()=>{navigate("Login")}} >Login/Register</div>}
          </div>
          <div className="flex flex-row gap-2">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar
