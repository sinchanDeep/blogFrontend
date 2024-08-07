import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MyBlogs from "./components/myBlogs/MyBlogs";
import Individual from "./components/IndividualBlog/IndividualBlog";
import ForgotPassword from './components/Login/ForgotPassword';


function App() {
  return (
   <>
   
   <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home/>}/>
        <Route path="https://blogliteapp.netlify.app/Login" element={<Login/>}/>
        <Route path="https://blogliteapp.netlify.app/Home" element={<Home/>}/>
        <Route path="https://blogliteapp.netlify.app/myBlogs" element={<MyBlogs/>}/>
        <Route path="https://blogliteapp.netlify.app/Individual" element={<Individual/>}/>
        <Route path="https://blogliteapp.netlify.app/forgotPassword" element={<ForgotPassword/>}/>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
