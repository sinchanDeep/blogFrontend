import React, { useState, useEffect } from "react";
import homeCss from "../Home/Home.module.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link, animateScroll as scroll } from "react-scroll";

const Home = () => {
  const navigate = useNavigate();

  const ReadMore = (e) => {
    const id = e.target.id;
    navigate("/Individual", { state: { id: id } });
  };

  let allBlogsArr = [];
  const [arr, setArr] = useState([]);
  const [img, setImg] = useState("images/logo.png");

  useEffect(() => {
    try {
      document.body.className = homeCss.homeBody;
      axios({
        headers: { "Content-Type": "application/json" },
        method: "POST",
        url: "https://blogbackend-3-ityn.onrender.com/api/blog/getAllBlogs",
      }).then((res) => {
        allBlogsArr = res.data;
        setImg(res.data.picture);
        setArr(res.data.reverse());
      });
    } catch (err) {
      console.log("");
    }
  }, []);

  const searchBlog = () => {
    let searchKey = document.getElementById("searchKey").value;
    if (searchKey == "") alert("enter a valid key");
    else {
      try {
        axios({
          headers: { "Content-Type": "application/json" },
          method: "POST",
          url: "https://blogbackend-3-ityn.onrender.com/api/blog/getSearchRes",
          data: {
            searchKey,
          },
        }).then((res) => {
          setArr(res.data);
          // Smooth scroll to the results section
          scroll.scrollToBottom();
        });
      } catch (err) {
        console.log("");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <div>
          <Navbar />
        </div>
        <div className="relative pt-12">
          <img src="images/logo.png" className="w-full h-full object-cover" />
          <div className={homeCss.textbox}>
            <input
              className="border-none outline-none p-2"
              id="searchKey"
              type="text"
              placeholder="Enter a blog title to search"
              style={{ width: "230px", textDecoration: "none" }}
            />
            <Button variant="outlined" onClick={searchBlog}>
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-normal">
          {arr.map((blog, index) => (
            <div
              key={index}
              id={"ids" + index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 m-5 w-full md:w-1/3"
            >
              <a>
                <img
                  id={homeCss.img}
                  className="rounded-t-lg mx-auto"
                  style={{ height: "200px", width: "100%" }}
                  src={blog.picture}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </a>
                <p
                  id={"desc" + blog.date}
                  className="mb-12 font-normal text-gray-700 dark:text-gray-400"
                >
                  {blog.description.substring(0, 40)}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Author: {blog.name}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Posted on: {blog.humanDate}
                </p>
                <a
                  className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    ReadMore(e);
                  }}
                  id={blog.date}
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
