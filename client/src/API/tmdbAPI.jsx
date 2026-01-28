// client/src/api/tmdbApi.js

export const API_KEY = '46f87255f304cb323c76a53abf325782'; 
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // w500 là chiều rộng ảnh 500px

// Hàm lấy danh sách phim thịnh hành (Có tiếng Việt)
export const fetchMovies = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=vi-VN&page=1`
        );
        const data = await response.json();
        return data.results; // Trả về mảng các phim
    } catch (error) {
        console.error("Lỗi lấy phim TMDB:", error);
        return [];
    }
};

// Hàm lấy Trailer của một phim bất kỳ (theo ID)
export const fetchMovieVideos = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const data = await response.json();
        
        // Tìm video nào là "Trailer" và ở trên "YouTube"
        const trailer = data.results.find(
            (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
        );
        
        // Nếu tìm thấy thì trả về link Embed Youtube, không thì null
        return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
    } catch (error) {
        return null;
    }
};