
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter ,Route, Routes } from 'react-router-dom';
import Home from './Home/Home.jsx';
import MovieDetails from './MovieDetails/MovieDetails.jsx';
import Login from './Login/Login.jsx';
import Error from './Error.jsx';
import NavbarComp from './Navbar/NavbarComp.jsx';
import Profile from './Profile/Profile.jsx';
import Wishlist from './Wishlist/Wishlist.jsx';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const initialValues= {username:"",email:"", password:""};
  const [formValues, setFormValues]= useState(initialValues);
  const [loggedInUser,setLoggedInUser]= useState("");

  return(
  <>
  <BrowserRouter>
  <NavbarComp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} formValues={formValues} setFormValues={setFormValues} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
    <Routes>
    <Route path="/login"  element={<Login setIsLoggedIn={setIsLoggedIn} setFormValues={setFormValues} formValues={formValues} setLoggedInUser={setLoggedInUser}/>}/>
    <Route path="/"  element={<Home/>}/>
    <Route path="/movie/:id" element={<MovieDetails />}/>
    <Route path="*" element={<Error/>}/>
    <Route path="/profile" element ={<Profile/>}/>
    <Route path="/wishlist" element ={<Wishlist/>}/>
    </Routes>
</BrowserRouter>
</>
  )
}

export default App
