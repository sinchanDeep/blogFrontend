import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import homeCss from "../Home/Home.module.css";

const IndividualBlog = () => {

    let [blogs,setBlogs]=useState([{"description":""}]);
    let arr=[];
    const location=useLocation();
    useState(()=>{
        document.body.className = homeCss.homeBody;
    const date=location.state.id;
    //const description=location.state.desc;
    //alert(description);
    
    axios({
        headers:{"Content-Type":"application/json"},
        method:"POST",
        url:"http://localhost:5000/api/blog/getIndividualBlog",
        data:{
            date
        }
    }).then((res)=>{
        console.log(res.data);
        setBlogs(res.data);
        arr=res.data;
    });
},[]);
   
  return (
    <>
      <div>
        <Navbar />
      </div>
      {blogs.map((blog) => (
        <div  class="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 w-full">
          <a className={homeCss.individual} style={{ margin: "auto", width: "full"}}>
            <img id={homeCss.incontain} class="rounded-t-lg" src={blog.picture} alt="" />
          </a>
          <div class="p-5">
            <a>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                {blog.title}
              </h5>
            </a>
            <p class="mb-12 font-normal text-gray-700 dark:text-gray-400">
              {blog.description}
            </p>
            <p class=" font-normal text-gray-700 dark:text-gray-400">
              Author: {blog.name}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Posted on: {blog.humanDate}
            </p>
          </div>
        </div>
      ))}
      ;
    </>
  );
}

export default IndividualBlog
