import React, {useState,useEffect} from 'react';
import { NavLink,useParams } from 'react-router-dom';
import { API_URL } from './context';

const SingleMovie = () => {
  const { id } =useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");
  

  // for fetching an api
  const getMovies = async(url) =>{
      setIsLoading(true);
      try {
          const res=await fetch(url);
          const data= await res.json();
          console.log(data);
          if(data.Response === "True"){
              setIsLoading(false);
              // to pass only the data
              setMovie(data);
          }
         
       } catch (error) {
          console.log(error);
      }

  }
// api is passed
  useEffect(()=>{
     let timerOut = setTimeout(()=>{
      // for geting the information of the movie by id
          getMovies(`${API_URL}&i=${id}`);
      },500);
      return () => clearTimeout(timerOut);
  },[id]);

  if(isLoading){
    return (
      <div className="movie-section">
        <div className="loading" >Loading...</div>

      </div>
    )
  }
  return (
    
    <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img src={movie.Poster} alt=''></img>

        </figure>
        <div className='card-content'>
          <p className='title'>{movie.title}</p>
          <p className='card-text'>{movie.Released}</p>
          <p className='card-text'>{movie.Actors}</p>
          <p className='card-text'>{movie.Genre}</p>
          <p className='card-text'>{movie.imdbRating}/10</p>
          <p className='card-text'>{movie.Country}</p>
          <NavLink  to="/" className={"back-btn"}>Go Back</NavLink>

        </div>
      </div>
    </section>
    
  );
};

export default SingleMovie;