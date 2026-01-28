import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import MovieList from './List/MovieList';
import SongList from './List/SongList';
import HeroSection from './Components/HeroSection';
import MovieDetail from './Detail/MovieDetail';
import SongDetail from './Detail/SongDetail';
import SearchPage from './Detail/Searchpage'; 
import Footer from './Footer';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';

function App() {
  return (
    <div>
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        
        {/* Các trang con cần padding-top để tránh bị Menu che */}
        <Route path="/movies" element={<div className="page-container-movie" style={{paddingTop: '100px'}}><MovieList /></div>} />
        <Route path="/songs" element={<div className="page-container-song" style={{paddingTop: '100px'}}><SongList /></div>} />
        
        <Route path="/movie/:id" element={<div style={{paddingTop: '80px'}}><MovieDetail /></div>} />
        <Route path="/song/:id" element={<div style={{paddingTop: '80px'}}><SongDetail /></div>} />
        <Route path="/search" element={<div style={{paddingTop: '100px'}}><SearchPage /></div>} /> 
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;