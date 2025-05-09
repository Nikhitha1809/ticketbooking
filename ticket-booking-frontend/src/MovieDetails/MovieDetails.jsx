import { useState, useEffect,useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import HomeCarousel from "../Carousel/Carousel";
import './MovieDetails.css';
import { WishlistContext } from '../WishlistContext/WishlistContext';
const MovieDetails = () => {
  const { id } = useParams();
  const [data, moviesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const { addToWishlist } = useContext(WishlistContext);
 // const whishlist = useContext(whishListContext);
  // const { addToWishlist } = whishListContext();
  // const handleAddToWishlist = () => {
  //   addToWishlist(data);
  // };
  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(
        (response) => response.json()
      )
      .then((data) => {
        // console.log("data", data);
        moviesData(data);
        setLoading(false)
        setError(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(true);
        setError(true)
      });
  }, [id]);
  if (loading) {
    return <div><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Movie not found</div>;
  }
  const movieBanner = {
    width: "95vw",
    height: "50vh",

  }
  return (
    <div>
    
      <div style={{ overflow: "hidden", padding: "2%", backgroundColor: "black" }}>
        <div>
          {/* <img src={data.movie_banner} alt="movie" style={movieBanner} /> */}
        </div>
        <div className="movie-details-container" style={{backgroundImage: `linear-gradient(to right, rgba(24, 24, 24, 0.95) 50%, rgba(0, 0, 0, 0.2) 80%), url(${data.movie_banner})`, 
        backgroundSize: 'cover',       // Optional: covers the whole area
    backgroundPosition: 'center',  // Optional: centers the image
    backgroundRepeat: 'no-repeat'}}>
          {/* left side image div */}
          <div className="d-flex flex-column image-container">
            <img src={data.image} alt="movieImage" />
            {/* <button type="button" className="watch-button">Watch Later</button>
          <button type="button" className="watch-button">Add to wishList</button> */}
          </div>
          <div>
            {/* details div */}
            <div className="details-container">
              <h2 style={{ color: "white", fontSize:"36px ",fontWeight:"bold"}}>{data.title}</h2>
              {/* <p className="description details-heading">Details</p> */}
              <div className="d-flex flex-column">
                <div className="d-flex flex-row description">
                  <p><b>Director : </b> </p>
                  <p> {data.director}</p>
                </div>
                <div className="d-flex flex-row description">
                  <p><b>Producer: </b> </p>
                  <p> {data.producer}</p>
                </div>
                <div className="d-flex flex-row description">
                  <p><b>Release Date : </b></p>
                  <p>{data.release_date}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                {/* <Link to={'/'}>
                <button onClick={handleAddToWishlist} className="back-btn ml-2">Book a Ticket</button>
                </Link> */}
                {/* <Link to={'/wishlist'} state={{ title: data.title }}> */}
                <Link to={'/wishlist'}>
                <button onClick={() => addToWishlist(data)} className="back-btn">Add to wishlist</button>
                </Link>
                <Link to={'/'}>
                <button className="back-btn">Go Back</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails;