

import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { PiUserCirclePlus, PiUserCircleLight } from "react-icons/pi";
import './NavbarComp.css';
import { Link ,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'
import Modal from '../Modal/Modal.jsx';

function NavbarComp({ isLoggedIn,setIsLoggedIn,formValues,setFormValues,setLoggedInUser,loggedInUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const initialValues= {email:"", password:""};
  // const [formValues, setFormValues]= useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () =>{
  //  setShowModal(false);
   setOpenModal(false);
   setFormValues({username:"",email:"",password:""});
  }
    
  const handleShow = () => setShowModal(true);

  const handleDropDownToggle = () => {
    setShowDropdown((prev) => !prev);
  };
  
  const toggleSignIn = () => {
    if (isLoggedIn) {
      // If the user is logged in, toggle the dropdown menu
      setShowDropdown((prev) => !prev);
    } else {
      // If the user is not logged in, show the modal
      handleShow();
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const signIn = () => {
    setIsLoggedIn(true);
    setShowModal(false);
    
  };

  const handleChange=(e)=>{
    const {name, value}= e.target;
    setFormValues({...formValues, [name]:value});
  };
  // if (Object.keys(formErrors).length === 0) {
  //   signIn(); // Call signIn if there are no validation errors
  // }
  useEffect(()=>{
    if(Object.keys(formErrors).length===0 & isSubmit){
      // console.log(formValues);
      signIn();
    }
  },[formErrors]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    // setIsSubmit(true);
    const signInSubmit = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/sign-in`,
      {method:"POST",
      headers:{"Content-type": "application/json"},
      body: JSON.stringify(formValues)
      }
    );
    const signInResponse = await signInSubmit.json();
    // console.log("signInRes",signInResponse)
    if(signInResponse.error.isError){
      toast.error(signInResponse.error.message)
    }else{
      toast.success("Hurry, your logged in...");
      setIsLoggedIn(true);
      setLoggedInUser(signInResponse.data[0].userName); // ✅ Save logged-in username
      setFormValues({username:"",email:"",password:""});
      setOpenModal(false);
      navigate("/");
    }
  };
  const validate=(values)=>{
    const errors ={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
      errors.email="Email is required"
    }
     if(!values.password){
      errors.password ="Password is required"
    }else if (values.password.length<4){
      errors.password = "Password should be more than 4 characters"
    }
    return errors;
  }

  return (
    <div className='navbar'>
      <Toaster/>
      <Navbar bg="light" data-bs-theme="light" fixed="top">
        <Link to={'/'}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RHSOacKMp98Ix4_Sgn5tvjs_bBxX4Row7A&usqp=CAU"
            width="30px"
            height="30px"
            style={{ marginLeft: "20px" }}
            alt="logo"
          />
        </Link>
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#browse" style={{ paddingRight: "20px", paddingLeft: "20px" }} className='nav-style'>Browse</Nav.Link> */}
            {/* <Nav.Link href="#shows" style={{ paddingRight: "20px", paddingLeft: "20px" }} className='nav-style'>TV-shows</Nav.Link> */}
            <Link to="/wishlist" style={{ paddingRight: "20px", paddingLeft: "20px" }} className='nav-style'>Wishlist</Link>
            {/* <Nav.Link href="#games" style={{ paddingRight: "20px", paddingLeft: "20px" }} className='nav-style'>Games</Nav.Link> */}
          </Nav>
          <Nav>
            <p style={{marginRight:"10px"}}>{isLoggedIn? `Welcome ${loggedInUser}`:""}</p>
            <div onClick={toggleSignIn} style={{ cursor: "pointer" }}>
              {isLoggedIn ? (
                <PiUserCircleLight style={{ width: "30px", height: "30px" }} />
              ) : (
                <PiUserCirclePlus style={{ width: "30px", height: "30px" }} onClick={() => setOpenModal(true)} />
              )}
            </div>
            {isLoggedIn && showDropdown && (
              <div className='flex flex-col dropDownProfile'>
                <ul className='flex flex-col gap-4' style={{ listStyleType: "none" }}>
                  <li>
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <li onClick={signOut}>
                    <Link>Sign Out</Link>
                  </li>
                </ul>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Modal isOpen={openModal} >
        <div className='d-flex flex-row justify-content-center'>
        <h2 style={{textAlign:'center', color:'rgb(38, 108, 220)', marginTop:"2%"}}>Login</h2>
          <p onClick={handleClose} className='position-absolute end-0 m-3 cross-btn'>X</p>
        </div>
      <form className="d-flex flex-column justify-content-center gap-2" onSubmit={handleSubmit} >
            <div>
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" id='username' name='username' value={formValues.username} onChange={handleChange} style={{width:"100%"}}/>
            </div>
            <div>
            <label htmlFor="email"><b>Email*</b></label>
            <input type="email" id='email' name='email' value={formValues.email} onChange={handleChange} style={{width:"100%"}}/>
            {formErrors.email? <p style={{color:"red"}}>{formErrors.email}</p>:<p style={{display:'none'}}></p>}
            </div>
            <div>
            <label htmlFor="password"><b>Password*</b>  </label>
            <input id="password" name="password" type="password" value={formValues.password} onChange={handleChange} style={{width:"100%"}}/>
            {formErrors.password? <p style={{color:"red"}}>{formErrors.password}</p>:<p style={{display:'none'}}></p>}
            {/* <p style={{color:"red"}}>{formErrors.password}</p> */}
            </div>
            <button className="signin-btn" type='submit'>Submit</button>
          </form>
          {/* Include your sign-in form or logic here */}
          <div>
            <p >Don‘t have an account? 
              <Link  to='/login' onClick={handleClose}> Sign Up</Link></p>
          </div>
      </Modal>
      
    </div>
  );
}

export default NavbarComp;
