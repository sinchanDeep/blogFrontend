import React from 'react'
import navCss from "../Navbar/Navbar.module.css";
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"


const Navbar = () => {
  const navigate=useNavigate();
  const logOut=()=>{
    Cookies.remove("jwtToken");
    navigate("/");
  }


  return (
    <>
      <div className={navCss.container}>
        <div className={navCss.headers}>
          <div className="flex flex-row gap-5" id={navCss.elements}>
            <div onClick={()=>{navigate("/myBlogs")}} style={{cursor:"pointer"}}>My Blogs</div>
            <Link to="/Home">Home</Link>
            <div  style={{cursor:"pointer"}} onClick={logOut}>Log Out</div>
          </div>
          <div className="flex flex-row gap-2">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar
