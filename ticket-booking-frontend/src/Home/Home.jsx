import React, { useState,useEffect , createContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { BsStarFill, BsStarHalf} from "react-icons/bs";
import Pagination from '../Pagination/Pagination.jsx';
import './Home.css';

const whishListContext = createContext();
function Home(){
const [movies, setMovies] = useState([]);
const [whishlist,setWhishList] = useState([]);
// const [showDropdown, setShowDropdown] = useState(false);
const [query, setQuery]= useState("");
useEffect(()=>{
    fetch('https://ghibliapi.vercel.app/films')
    .then(
      (response)=>response.json()
    )
    .then((data) => {
      // console.log("data",data);
       setMovies(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  },[]);

  return (
    <div>
      {/* body section */}
      <div>
       <div className='banner-section'>
        <div className='banner-description'>
          <h2>Inception</h2>
          <div>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            </div>
          <p>Inception centres on brooding “extractor” Dom Cobb (played by Leonardo DiCaprio)
            a thief who invades targets' dreams through a chemical-induced shared dream state 
            in order to steal valuable information.</p> 
            <div>
              <button className='bg-danger m-2'>Watch Trailer </button>
              <button>Add to whishlist </button>
            </div>
        </div>
       </div>
      </div>
      <div className='movies-list'>
        <div className='search-container'>
        <h4>Popular Movies</h4>
        <input className='search' type="search" placeholder="Search" aria-label="Search" 
            onChange={(e)=> setQuery(e.target.value)}/>
            </div>
        {/* <HomeCarousel movies={movies}/> */}
        <whishListContext.Provider value={whishlist}>
        <Pagination movies={movies} query={query} whishlist={whishlist}/>
        </whishListContext.Provider>
      </div>
    </div>
  )
}
export default Home;