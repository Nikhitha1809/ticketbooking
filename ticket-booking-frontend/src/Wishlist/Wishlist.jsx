import React from "react";
import { useContext,useState } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import "./Wishlist.css";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import cartImg from "../../src/assets/empty-cart-logo.png";
import confirmImg from "../../src/assets/confirm.jpg";
import Modal from '../Modal/Modal.jsx';
const Wishlist = () => {

  const location = useLocation();
  const { title } = location.state || {};
  const { wishlist, increaseQuantity, decreaseQuantity, clearWishlist } =
    useContext(WishlistContext);
    const [openModal, setOpenModal] = useState(false);
    const [authData,setAuthData]= useState(false);
    const navigate = useNavigate();

  // adding all the wishlist items
  const totalAmount = wishlist.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );
  function openHome(){
    clearWishlist();
    navigate('/')
  }
  if(!authData){
    if(localStorage.getItem('token')){
      setAuthData(true);
    }
  }

  return (
    <div>
      {/* <h1>My Wishlist</h1> */}
      {authData ?
      <div className="wishlist">
        {wishlist?.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={cartImg}
              style={{ height: "280px", opacity: "80%", borderRadius: "20px" }}
            />
            <p>
              <b>Your cart is empty</b>
            </p>
            <p>Just relax, let us help you find some best movies.</p>
            <Link to="/">
              <button type="button" className="start-btn">
                {" "}
                Start Booking{" "}
              </button>
            </Link>
          </div>
        ) : (
          <div className="wishList-container">
            <div className="movie-containers">
              {wishlist?.map((movie, index) => (
                <div className="wishlist-card" key={index}>
                  <Link to={`/movie/${movie?.id}`} style={{textDecoration:"none"}}>
                    <div className="img-container">
                      <img
                        src={movie?.image}
                        alt="movieImage"
                        style={{ width: "80px", height: "80px" }}
                      />
                      <p className="movie-title">{movie?.title}</p>
                    </div>
                  </Link>
                  <div className="btn-container">
                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={() => increaseQuantity(movie?.id)}
                    >
                      +
                    </button>
                    <p>{movie.quantity}</p>
                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={() => decreaseQuantity(movie?.id)}
                    >
                      -
                    </button>
                  </div>
                  <div>₹{movie.amount}</div>
                </div>
              ))}
            </div>
            <div className="price-container">
              <div className="d-flex flex-row gap-4">
                <p>
                  <b>Sub Total</b>({wishlist.length} items)
                </p>
                <b>₹{totalAmount}.00</b>
              </div>
              <button type="button" className="checkout-btn" onClick={() => setOpenModal(true)} >Checkout</button>
              <Modal isOpen={openModal} onClose={openHome}>
        <h4>Great Choice </h4>
        <p>Thanks for booking with us!</p>
        <p>Your Ticket is confirmed.</p>
        <img src={confirmImg} width="50px"/>
        <button onClick={openHome} className="close-button">Continue Booking</button>
      </Modal>
              <Link to="/" className="no-underline"><p>Continue Booking</p></Link>
            </div>

          </div>
        )}
      </div> :
      <div className="signin-text">Please click on signIn to access wish List </div>
      }
     
    </div>
  );
};

export default Wishlist;
