import { useState, useEffect } from 'react';
import Card from '../Components/UI/Card'; 

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 1. LOGIC PHÂN TRANG ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Giới hạn 10 phim/trang

    useEffect(() => {
        fetch('http://localhost:5000/api/movies')
            .then(res => {
                if (!res.ok) throw new Error('Không thể kết nối Server');
                return res.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi tải phim:", err);
                setError("Không thể tải danh sách phim.");
                setLoading(false);
            });
    }, []);

    // --- 2. TÍNH TOÁN DỮ LIỆU ĐỂ HIỂN THỊ ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>⏳ Đang tải kho phim...</div>;
    if (error) return <div style={{ padding: '50px', textAlign: 'center', color: '#e50914' }}>⚠️ {error}</div>;

    return (
        
        <div style={{ paddingBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px', paddingLeft: '10px', borderLeft: '4px solid var(--primary-movie)', marginTop: '50px' }}>
                <h2 style={{ marginBottom: '10px' , margin: 0, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px', paddingBottom: '10px' }}>
                    Phim Đề Cử
                </h2>
            </div> 

            {/* Grid hiển thị 10 phim hiện tại */}
            <div className="media-grid">
                {currentMovies.map(m => (
                    <Card 
                        key={m.MovieID}
                        id={m.MovieID}
                        type="movie"
                        title={m.Title}
                        subtitle={`${m.ReleaseYear} • ${m.Genre}`}
                        image={m.PosterURL}
                    />
                ))}
            </div>
            {/* --- PHẦN NÚT PHÂN TRANG (PAGINATION) --- */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px' }}>
                    
                    {/* Nút Trước */}
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="btn-pagination"
                    >
                        ❮
                    </button>

                    {/* Các nút số */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`btn-pagination ${currentPage === i + 1 ? 'active-mode' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Nút Sau */}
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="btn-pagination"
                    >
                        ❯
                    </button>
                </div>
            )}
        </div>
    
    );
}

export default MovieList;