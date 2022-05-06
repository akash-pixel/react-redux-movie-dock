import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import user_icon from "../../images/user_icon.png"
import "./Header.scss"

function Header() {
  const [term , setTerm] = useState("");
  const dispatch = useDispatch();

  const submitHandler=(e) =>{
    e.preventDefault();
    dispatch( fetchAsyncMovies(term) );
    dispatch( fetchAsyncShows(term) );
    setTerm("");
  }

  return (
    <div className='header'>
      
      <div className='logo'>
        <Link to="/" >The Movie Dock</Link>
      </div>
      
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input type="text" value={term} placeholder="Search Movies or Shows" onChange={(e)=>{setTerm(e.target.value)}} />
          <button type='submit'> <i className="fa fa-search"></i> </button>
        </form>
      </div>

      <div className='user-image' >
        <img src={user_icon} alt="user"  />
      </div>
    </div>
  )
}

export default Header