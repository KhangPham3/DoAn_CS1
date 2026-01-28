import React from "react";
import HeroSection from '../Components/HeroSection';
import MovieList from '../List/MovieList';
import SongList from '../List/SongList';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <div className="page-container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                <MovieList />
                <div style={{ height: 40 }}></div> {/* Khoảng cách */}
                <SongList /> 
            </div>
            <div/> 

        </>
    );
};
export default HomePage;