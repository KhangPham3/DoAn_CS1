import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
    const [keyword, setKeyword] = useState('');
    const [scrolled, setScrolled] = useState(false);
    
    // State dữ liệu
    const [allData, setAllData] = useState([]); 
    const [suggestions, setSuggestions] = useState([]); 
    const [showSearchDropdown, setShowSearchDropdown] = useState(false); 
    const genreMenuTimeoutRef = useRef(null);
    // State cho menu Thể Loại
    const [showGenreMenu, setShowGenreMenu] = useState(false);
    const handleGenreMouseEnter = () => {
        // Nếu đang có lệnh "chuẩn bị đóng", hủy nó ngay lập tức
        if (genreMenuTimeoutRef.current) {
            clearTimeout(genreMenuTimeoutRef.current);
        }
        setShowGenreMenu(true);
    };
    const handleGenreMouseLeave = () => {
        // Không đóng ngay, mà chờ 200ms (0.2 giây)
        genreMenuTimeoutRef.current = setTimeout(() => {
            setShowGenreMenu(false);
        }, 300); // Bạn có thể tăng lên 300 nếu muốn chậm hơn
    };
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // 1. Tải dữ liệu và Gộp chung
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resMovies, resSongs] = await Promise.all([
                    fetch('http://localhost:5000/api/movies'),
                    fetch('http://localhost:5000/api/songs')
                ]);
                const movies = await resMovies.json();
                const songs = await resSongs.json();

                const combined = [
                    ...movies.map(m => ({ ...m, type: 'movie', name: m.Title, sub: m.Genre })),
                    ...songs.map(s => ({ ...s, type: 'song', name: s.Title, sub: s.Artist }))
                ];
                setAllData(combined);
            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
            }
        };
        fetchData();

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Tự động trích xuất danh sách Thể loại từ dữ liệu (Không cần nhập tay)
    const genres = useMemo(() => {
        const movieGenres = [...new Set(allData.filter(i => i.type === 'movie').map(i => i.sub).filter(Boolean))];
        const songGenres = [...new Set(allData.filter(i => i.type === 'song').map(i => i.Genre).filter(Boolean))]; // Lưu ý: API Song trả về field Genre
        return { movieGenres, songGenres };
    }, [allData]);

    // 3. Xử lý click ra ngoài để tắt Search
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 4. Logic tìm kiếm (Giữ nguyên)
    const handleInputChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        if (value.length > 0) {
            const filtered = allData.filter(item => item.name.toLowerCase().includes(value.toLowerCase())).slice(0, 8);
            setSuggestions(filtered);
            setShowSearchDropdown(true);
        } else {
            setShowSearchDropdown(false);
        }
    };

    const handleSelectSuggestion = (item) => {
        navigate(`/${item.type}/${item.type === 'movie' ? item.MovieID : item.SongID}`);
        setShowSearchDropdown(false);
        setKeyword(''); 
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?q=${keyword}`);
            setShowSearchDropdown(false);
        }
    };

    // Hàm chuyển hướng khi chọn thể loại (Link tới trang tìm kiếm với từ khóa thể loại)
    const handleGenreClick = (genreName) => {
        navigate(`/search?q=${genreName}`);
        setShowGenreMenu(false);
    };

    return (
        <nav style={{ 
            position: 'fixed', top: 0, width: '100%', zIndex: 9999,
            padding: '10px 40px', height: '70px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'all 0.3s ease',
            background: scrolled ? '#0f0f0f' : 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)',
            backdropFilter: scrolled ? 'blur(10px)' : 'none'
        }}>
            
            {/* --- KHU VỰC 1: LOGO + MENU --- */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', minWidth: '300px' }}>
                <Link to="/" style={{ color: '#e50914', textDecoration: 'none', fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>
                    F&M
                </Link>
                
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <Link to="/movies" className="nav-link">Phim</Link>
                    <Link to="/songs" className="nav-link">Nhạc</Link>

                    {/* --- 👇 MỤC THỂ LOẠI (CÓ DROPDOWN) --- */}
                    {/* --- 👇 MỤC THỂ LOẠI (Đã nâng cấp logic chuột) --- */}
                    <div 
                        style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                        onMouseEnter={handleGenreMouseEnter} // Dùng hàm mới
                        onMouseLeave={handleGenreMouseLeave} // Dùng hàm mới
                    >
                        <span className="nav-link" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            Thể loại <small style={{fontSize: '0.6rem'}}>▼</small>
                        </span>

                        {/* MENU XỔ XUỐNG */}
                        {showGenreMenu && (
                            <div 
                                style={{
                                    position: 'absolute', top: '40px', left: '-50px',
                                    width: '350px',
                                    background: 'rgba(20, 20, 20, 0.95)',
                                    backdropFilter: 'blur(15px)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '20px',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '20px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                                    zIndex: 10000,
                                    
                                    /* 👇 THÊM DÒNG NÀY ĐỂ AN TOÀN HƠN: Tạo một khoảng đệm vô hình nối liền text và menu */
                                    marginTop: '10px' 
                                }}
                                // Khi chuột đã vào trong menu, cũng gọi hàm Enter để giữ menu mở
                                onMouseEnter={handleGenreMouseEnter}
                                onMouseLeave={handleGenreMouseLeave}
                            >
                                {/* Cầu nối vô hình (Transparent Bridge) để chuột không bị lọt khe */}
                                <div style={{ position: 'absolute', top: '-20px', left: 0, width: '100%', height: '20px', background: 'transparent' }}></div>

                                {/* Cột 1: Phim */}
                                <div>
                                    <h4 style={{ color: '#e50914', margin: '0 0 10px 0', borderBottom: '1px solid #333', paddingBottom: '5px' }}>🎬 PHIM</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {genres.movieGenres.slice(0, 6).map((g, idx) => (
                                            <div key={idx} onClick={() => handleGenreClick(g)} className="genre-item">
                                                {g}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cột 2: Nhạc */}
                                <div>
                                    <h4 style={{ color: '#1db954', margin: '0 0 10px 0', borderBottom: '1px solid #333', paddingBottom: '5px' }}>🎵 NHẠC</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {genres.songGenres.slice(0, 6).map((g, idx) => (
                                            <div key={idx} onClick={() => handleGenreClick(g)} className="genre-item">
                                                {g}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- KHU VỰC 2: SEARCH BAR --- */}
            <div ref={searchRef} style={{ flex: 1, maxWidth: '500px', position: 'relative', marginTop: '10px' }}>
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'stretch' }}>
                    <input 
                        type="text" placeholder="Tìm kiếm..." value={keyword}
                        onChange={handleInputChange} onFocus={() => keyword && setShowSearchDropdown(true)}
                        style={{ 
                            width: '100%', padding: '0 15px', height: '40px',
                            background: '#121212', border: '1px solid #333', borderRight: 'none',
                            color: 'white', borderRadius: '20px 0 0 20px', outline: 'none', fontSize: '1rem', boxSizing: 'border-box'
                        }}
                    />
                    <button type="submit" style={{ 
                        width: '60px', height: '40px', background: '#222', 
                        border: '1px solid #333', borderRadius: '0 20px 20px 0', 
                        color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', padding: 0, boxSizing: 'border-box'
                    }}>🔍</button>
                </form>

                {/* Dropdown Gợi ý Tìm kiếm */}
                {showSearchDropdown && suggestions.length > 0 && (
                    <div style={{
                        position: 'absolute', top: '50px', left: 0, width: '100%',
                        background: '#1e1e1e', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.8)',
                        overflow: 'hidden', border: '1px solid #333'
                    }}>
                        {suggestions.map((item, index) => (
                            <div key={index} onClick={() => handleSelectSuggestion(item)} className="search-item"
                                style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', borderBottom: '1px solid #333' }}>
                                <img src={item.PosterURL || item.CoverImageURL} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                                <div>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.name}</div>
                                    <div style={{ color: '#aaa', fontSize: '0.75rem' }}>{item.type === 'movie' ? '🎬 Phim' : '🎵 Nhạc'} • {item.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ minWidth: '300px' }}></div>
           
           {/* Nút login / signup */}
            <div>
                <button style={{ marginRight: '10px', padding: '10px 20px', background: '#e50914', color: 'white', border: 'none', borderRadius: '40px', cursor: 'pointer' }}>
                  Đăng Nhập 
                </button>
                <button style={{marginRight: '50px', padding: '10px 25px', background: '#e50914', color: 'white', border: 'none', borderRadius: '40px', cursor: 'pointer' }}>
                    Đăng ký
                </button>
            </div>

        </nav>
    );
}

export default Navigation;