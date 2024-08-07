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
        <Route path="https://blogbackend-3-ityn.onrender.com/Login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="https://blogbackend-3-ityn.onrender.com/myBlogs" element={<MyBlogs/>}/>
        <Route path="https://blogbackend-3-ityn.onrender.com/Individual" element={<Individual/>}/>
        <Route path="https://blogbackend-3-ityn.onrender.com/forgotPassword" element={<ForgotPassword/>}/>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
