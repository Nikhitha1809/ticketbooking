{/* <HomeCarousel movies={movies}/>     */}

{/* <div>
<ul id="movie-list">
    {movies.map((movie) => (
        <li key={movie.id} id="scrolling-images" className="main-bg" >
            <Link to={`/movie/${movie.id}`}>
                <img src={movie.image} alt={movie.title} width="200px" height="150px" onClick={`onClickImg${movie.id}`} />
            </Link>

        </li>
    ))}
</ul>
</div> */}

// import React, { useState } from 'react';
// import { Navbar, Container, Nav, Dropdown, Button, OverlayTrigger, Popover } from 'react-bootstrap';
// import { IoSearch } from "react-icons/io5";
// import { IoMdContact } from "react-icons/io";

// const NavBarComp = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleContactClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log('Logout clicked');
//     // Reset the dropdown state
//     setShowDropdown(false);
//   };

//   const popover = (
//     <Popover id="popover-basic">
//       <Popover.Content>
//         <Button variant="link" onClick={handleLogout}>Logout</Button>
//       </Popover.Content>
//     </Popover>
//   );

//   return (
//     <Navbar bg="light" data-bs-theme="light" fixed="top" className='navbar'>
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RHSOacKMp98Ix4_Sgn5tvjs_bBxX4Row7A&usqp=CAU" width="30px" height="30px" style={{marginLeft:"20px"}}/>
//       <Container>
//         <Navbar.Brand href="#home">Home</Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link href="#home" style={{paddingRight:"20px",paddingLeft:"20px"}} className='nav-style'>Browse</Nav.Link>
//           <Nav.Link href="#features" style={{paddingRight:"20px",paddingLeft:"20px"}} className='nav-style'>TV-shows</Nav.Link>
//           <Nav.Link href="#pricing" style={{paddingRight:"20px",paddingLeft:"20px"}} className='nav-style'>Wishlist</Nav.Link>
//           <Nav.Link href="#pricing" style={{paddingRight:"20px",paddingLeft:"20px"}} className='nav-style'>Games</Nav.Link>
//         </Nav>
//         <Nav>
//           <IoSearch style={{marginTop:"5px"}} />
//           <input type='search' placeholder='search' className='search-type'/>
//         </Nav>
//         <Nav>
//           <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
//             <IoMdContact style={{ width: "35px", height: "35px", cursor: 'pointer' }} onClick={handleContactClick}/>
//           </OverlayTrigger>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBarComp;




<Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit} >
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" id='username' name='username' value={formValues.username} onChange={handleChange}/>
            <label htmlFor="email"><b>Email*</b></label>
            <input type="email" id='email' name='email' value={formValues.email} onChange={handleChange}/>
            <p style={{color:"red"}}>{formErrors.email}</p>
            <label htmlFor="password"><b>Password*</b>  </label>
            <input id="password" name="password" type="password" value={formValues.password} onChange={handleChange}/>
            <p style={{color:"red"}}>{formErrors.password}</p>
            <button className="signin-btn" type='submit'>Submit</button>
          </form>
          {/* Include your sign-in form or logic here */}
          <div>
            <p style={{marginLeft:"20%"}}>Don‘t have an account? 
              <Link  to='/login' onClick={handleClose}> Sign Up</Link></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={signIn}>
            Sign In
          </Button> */}
          
        </Modal.Footer>
      </Modal>