import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Carousel.css";

function HomeCarousel({ movies, query, lenfn }) {
  // const len=(movies.filter((movie)=>movie.title.toLowerCase().includes(query))).length
  // lenfn(len)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );

  useEffect(() => {
    lenfn(filteredMovies.length);
  }, [filteredMovies.length, lenfn]);
  return (
    <div>
      {/* <div className='whole-cont'>
                <Carousel>
                    <Carousel.Item interval={1000} className='img-width'>
                        <img src="https://qph.cf2.quoracdn.net/main-qimg-698d7831adac73b3d9e39bf22a4de419-lq" alt='first slide' width="1500px" height="700px" />
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img src="https://cdn.europosters.eu/image/750/posters/one-piece-the-crew-vs-kaido-i168966.jpg" alt='second slide' width="1500px" height="700px" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://sm.ign.com/ign_in/screenshot/default/jujutsukaisen_vdeh.png" alt='third slide' width="1500px" height="700px" />
                    </Carousel.Item>
                </Carousel>
            </div> */}
      <div>
        <ul className="list-movies">
          {/* {movies.filter((movie)=>movie.title.toLowerCase().includes(query)).map((movie) => (
                        <li key={movie.id}  >
                            <Link to={`/movie/${movie.id}`}>
                                <img src={movie.image} alt={movie.title} width="200px" height="250px" className='movie-img' />
                            </Link>
                        </li>
                    ))} */}
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  width="200px"
                  height="250px"
                  className="movie-img"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}
export default HomeCarousel;
