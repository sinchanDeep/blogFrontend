import React from 'react'
import Navbar from "../Navbar/Navbar";
import myBlogCss from "../myBlogs/MyBlogs.module.css";
import {FormControl,InputBase,Button,Container, styled, TextArea, TextareaAutosize} from "@mui/material";
import {AddCircle as Add} from '@mui/icons-material';
import {useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Navigate, useNavigate } from 'react-router-dom';
import imageCompression from "browser-image-compression";

const StyledFormControl = styled(FormControl)`
display:flex;
flex-direction:row;
margin-top:10px;
`;

const InputTextField = styled(InputBase)`
flex:1;
margin:0 30px;
font-size:25px;
`;

const Textarea= styled(TextareaAutosize)`
width:100%;
margin-top:15px;
font-size:18px;
border:none;
outline:none;
`;
var initialPost= {
    "title":"",
    "description":"",
    "picture":"",
    "date":new Date(),
    "name":""
}


const MyBlogs =  () => {
    let chg=0;
    const navigate=useNavigate();
    const [name,setName]=useState("");
    let [title,setTitle]=useState("");
    let [description,setDescription]=useState("");
    let [userBlogs,setUserBlogs]=useState([]);
    const tkn=String(Cookies.get("jwtToken"));
    useEffect(()=>{
        document.body.className = myBlogCss.homeBody
        if(!tkn)
            navigate("/Login");
        axios({
            headers:{"Content-Type":"application/json"},
            method:"POST",
            url:"http://localhost:5000/api/blog/getUsername",
            data:{
                tkn
            }
        }).then((res)=>{
          setName(res.data);      
        });
    },[]);
    useEffect(()=>{
        axios({
            headers:{"Content-Type":"application/json"},
            method:"POST",
            url:"http://localhost:5000/api/blog/getUserBlogs",
            data:{
                name:name
            }
        }).then((response)=>{
            setUserBlogs(response.data.reverse());
        });
    },[name]);
    const [file,setFile]=useState("https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");
    const [post,setPost]=useState(initialPost);
    const getImage= async (e)=>{
        try{
        var reader=new FileReader();
        //const img=e.target.files[0];  
        reader.readAsDataURL(e.target.files[0]);
       let new_url;
        reader.onload=()=>{
            let image_url=reader.result;
            let img=document.createElement('img');
            img.src=image_url;
            
            img.onload=(e)=>{
                let canvas=document.createElement("canvas");
                let ratio=300/img.width;
                canvas.width=300;
                
                canvas.height=img.height*ratio;

                let context=canvas.getContext("2d");
                context.drawImage(img,0,0,canvas.width,canvas.height);
                new_url=canvas.toDataURL("image/jpeg",98);
                console.log(new_url);
                setFile(new_url);
                setPost({...post,["picture"]:new_url,["date"]:new Date(),["name"]:name});  
            }
            //setFile(reader.result);          
                   
        };
        reader.onerror=error =>{
            console.log(error); //throw error
        }
    }catch(err)
    {
        console.log(err);
    }
}
    const handleChange=(e)=>{
       // document.getElementById('setValue').value="";
       // document.getElementById('setValue').ariaReadOnly=false;
        setPost({...post , [e.target.name]:e.target.value});
    }

    
    const saveBlog=()=>{
        try{
            let {date,description,picture,title}=post;
           // date=new Date();
            axios({
                headers:{"Content-Type":"application/json"},
                method:"POST",             
                url:"https://blogbackend-3-ityn.onrender.com/api/blog/saveBlog",
                data:{
                    date,
                    description,
                    picture,
                    title,
                    name
                }
            }).then((res)=>{
                alert("your blog has been saved successfully");
                navigate("/");
                //window.location.reload();
            })
        }catch(err)
        {
            console.log(err);
        }
    }
   
    const deleteBlog=(event)=>{
        try{
        const delBlog=event.target.id;
        if(window.confirm("are you sure you want to delete this blog"))
        {
            axios({
                headers:{"Content-Type":"application/json"},
                method:"POST",
                url:"https://blogbackend-3-ityn.onrender.com/api/blog/delBlog",
                data:{
                    delBlog
                }
            }).then((res)=>{
                if(res.data.deletedCount>0)
                {
                    alert("blog deleted successfully");
                }
                chg=chg+1;
            })
         
        }
    }catch(err){
        console.log(err);
        alert("The blog has already been deleted");
       }
    }

    const editBlog=(event)=>{
        var ids=String(event.target.id);
        var data=ids.split("/");
        var date=data[0];
        var name=data[1];
       try{
        axios({
            headers:{"Content-Type":"application/json"},
            method:"POST",
            url:"https://blogbackend-3-ityn.onrender.com/api/blog/editBlog",
            data:{
                date,
                name
            }
        }).then((res)=>{         
            setFile(res.data[0].picture);
            setTitle(res.data[0].title);         
            setPost({...post ,["title"]:res.data[0].title,["picture"]:res.data[0].picture,["description"]:res.data[0].description,["date"]:res.data[0].date} )
            setDescription(res.data[0].description);
            document.documentElement.scrollTop = 0;      
        });
       }catch(err){
        console.log(err);
       }       
    } 
  return (
    <>
    <div>
    <Navbar/>
    </div>
    <Container className='bg-inherit'> 
    <img src={file} alt="banner" class={myBlogCss.image}/>
    <StyledFormControl className={myBlogCss.formcontrol}>
        <label htmlFor="fileinput">
            <Add fontSize='large' color="action"/>
        </label>
        <input 
        type="file" 
        id="fileinput" 
        style={{display:"none"}}
        onChange={getImage}
        />
        <label value={title}></label>
    
    <div className={myBlogCss.btn}>  
        <Button className='self-center' variant="contained" onClick={saveBlog}>Publish</Button>   
    </div>
   
    </StyledFormControl>
    <Textarea className='text-center'  placeholder="Title" defaultValue={title} onChange={(e)=>handleChange(e)} name="title"/>
    <Textarea
        defaultValue={description}
        minRows={5}
        placeholder="Tell your story"
        onChange={(e)=>handleChange(e)}
        name="description"
    />

    
    </Container>
    {userBlogs.map((blog,index)=>(
  <div key={index}>
   <div id={index} class="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 m-5 w-auto">
    <a href="#" style={{margin:"auto",width:"full"}}>
        <img class="rounded-t-lg"  src={blog.picture} alt="" />
    </a>
    <div class="p-5">
        
            <h5 id={"title"+blog.date} class="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
        
        <p class="mb-12 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
        <p class=" font-normal text-gray-700 dark:text-gray-400">Author: {blog.name}</p>
        <p id={blog.date}  class="mb-3 font-normal text-gray-700 dark:text-gray-400">Posted on: {blog.humanDate}</p>

        
            <label   htmlfor="deleteBlog"><button id={blog.date} onClick={(event)=>{deleteBlog(event)}} className={myBlogCss.delete} >Delete</button></label>
            <label  forhtml="edit" style={{marginTop:"5px"}} ><button id={blog.date+"/"+blog.name} onClick={(event)=>{editBlog(event)}} className={myBlogCss.edit}>Edit</button></label>
       
        <div>
           
        </div>
       
    </div>
</div>

</div>

))}
    </>
  )
}

export default MyBlogs
