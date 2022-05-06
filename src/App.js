import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from './components/Home/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import PageNotFound from './components/PageNotFound/PageNotFound'
import './App.scss';

// Movie Dock
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='container'>
          <Routes >
            <Route path='/' exact element={<Home />} />
            <Route path='/movie/:imdbId' element={<MovieDetail />} />
            <Route path="*"  element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
