import { useState, useEffect } from 'react';
import Card from '../Components/UI/Card'; 

function SongList() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- LOGIC PHÂN TRANG ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Giới hạn 10 nhạc/trang

    useEffect(() => {
        fetch('http://localhost:5000/api/songs')
            .then(res => res.json())
            .then(data => {
                setSongs(data);
                setLoading(false);
            })
            .catch(err => {
                setError("Lỗi tải nhạc");
                setLoading(false);
            });
    }, []);

    // Tính toán cắt mảng
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSongs = songs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(songs.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div style={{padding:40, textAlign:'center'}}>⏳ Đang tải nhạc...</div>;
    if (error) return <div style={{padding:40, textAlign:'center', color:'red'}}>⚠️ {error}</div>;

    return (
        <div style={{ paddingBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', paddingLeft: '10px', borderLeft: '4px solid var(--primary-music)' }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Bảng Xếp Hạng
                </h2>
            </div>

            <div className="media-grid">
                {currentSongs.map(s => (
                    <Card 
                        key={s.SongID}
                        id={s.SongID}
                        type="song"
                        title={s.Title}
                        subtitle={s.Artist}
                        image={s.CoverImageURL}
                    />
                ))}
            </div>
            {/* --- PHẦN NÚT PHÂN TRANG (PAGINATION) --- */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px' }}>
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="btn-pagination"
                    >
                        ❮
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`btn-pagination ${currentPage === i + 1 ? 'active-mode' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

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

export default SongList;