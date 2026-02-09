import { useState, useEffect } from 'react';
import Card from '../Components/UI/Card'; 
import { fetchMovies, fetchGenres, IMAGE_URL } from '../API/tmdbAPI';

function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    
    // --- STATE QUẢN LÝ PHÂN TRANG ---
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20); // Mặc định 20 phim/trang
    const [pageInput, setPageInput] = useState(''); // 👇 State mới: Lưu số trang người dùng nhập

    // Load dữ liệu
    useEffect(() => {
        const init = async () => {
            const genreList = await fetchGenres();
            setGenres(genreList);
            // Lấy 100 phim (5 trang API) để demo phân trang
            const initialMovies = await fetchMovies(100); 
            setMovies(initialMovies);
        };
        init();
    }, []);

    // --- LOGIC TÍNH TOÁN DANH SÁCH HIỂN THỊ ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    // 👇 HÀM XỬ LÝ KHI NHẬP SỐ TRANG RỒI ENTER
    const handlePageInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            const pageNumber = Number(pageInput);
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                paginate(pageNumber);
                setPageInput(''); // Xóa trắng ô nhập sau khi nhảy trang
            } else {
                alert(`Trang không hợp lệ! Vui lòng nhập từ 1 đến ${totalPages}`);
            }
        }
    };

    // --- LOGIC TẠO THANH PHÂN TRANG (CÓ DẤU ...) ---
    const renderPagination = () => {
        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 4) pages.push('...');
            
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            
            if (currentPage <= 4) { end = 4; start = 2; }
            if (currentPage >= totalPages - 3) { start = totalPages - 3; end = totalPages - 1; }
            
            for (let i = start; i <= end; i++) pages.push(i);
            
            if (currentPage < totalPages - 3) pages.push('...');
            pages.push(totalPages);
        }

        return (
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
                <button 
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                    style={btnPageStyle}
                > &lt; </button>

                {pages.map((page, index) => (
                    <button 
                        key={index}
                        onClick={() => page !== '...' && paginate(page)}
                        disabled={page === '...'}
                        style={{
                            ...btnPageStyle,
                            background: currentPage === page ? '#e50914' : '#333',
                            color: currentPage === page ? 'white' : '#ccc',
                            border: currentPage === page ? '1px solid #e50914' : '1px solid #444',
                            cursor: page === '...' ? 'default' : 'pointer'
                        }}
                    >
                        {page}
                    </button>
                ))}

                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                    style={btnPageStyle}
                > &gt; </button>
            </div>
        );
    };

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '50px' }}>
            {/* Header và Bộ điều khiển */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', marginBottom: '20px' }}>
                <h2 style={{ color: '#e50914', borderLeft: '5px solid #e50914', paddingLeft: '15px' }}>
                    KHO PHIM
                </h2>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                    {/* 👇 Ô NHẬP SỐ TRANG */}
                    <div>
                        Đến trang: 
                        <input 
                            type="number"
                            placeholder="#"
                            min="1" 
                            max={totalPages}
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            onKeyDown={handlePageInputKeyDown}
                            style={{ 
                                marginLeft: '10px', padding: '5px', width: '50px', 
                                borderRadius: '4px', background: '#333', color: 'white', 
                                border: '1px solid #444', textAlign: 'center' 
                            }}
                        />
                    </div>

                    {/* Ô CHỈNH SỐ LƯỢNG HIỂN THỊ */}
                    <div>
                        Hiển thị: 
                        <select 
                            value={itemsPerPage} 
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // Reset về trang 1 khi đổi số lượng
                            }}
                            style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', background: '#333', color: 'white', border: 'none' }}
                        >
                            <option value="10">10 phim</option>
                            <option value="20">20 phim</option>
                            <option value="50">50 phim</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Danh sách phim */}
            <div className="media-grid">
                {currentMovies.map(m => (
                    <Card 
                        key={m.id} id={m.id} type="movie" title={m.title}
                        image={m.poster_path ? `${IMAGE_URL}${m.poster_path}` : ''}
                        subtitle={`Năm: ${m.release_date?.substring(0,4)} • ⭐ ${m.vote_average}`}
                    />
                ))}
            </div>

            {/* Thanh phân trang */}
            {renderPagination()}
        </div>
    );
}

const btnPageStyle = {
    padding: '8px 14px', background: '#333', color: 'white',
    border: '1px solid #444', borderRadius: '4px', cursor: 'pointer',
    fontWeight: 'bold', transition: 'all 0.3s'
};

export default MoviePage;