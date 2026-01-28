import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Lấy từ khóa từ URL
    const [results, setResults] = useState({ movies: [], songs: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`http://localhost:5000/api/search?q=${query}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [query]);

    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h2>🔎 Kết quả tìm kiếm cho: "{query}"</h2>
            
            {loading && <p>⏳ Đang quét dữ liệu...</p>}

            {/* 1. Kết quả Phim */}
            <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>🎬 Phim tìm thấy ({results.movies.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {results.movies.length === 0 ? <p style={{color:'#777'}}>Không tìm thấy phim nào.</p> : 
                    results.movies.map(m => (
                        <div key={m.MovieID} style={{ background: '#333', padding: '10px', borderRadius: '5px' }}>
                            <Link to={`/movie/${m.MovieID}`} style={{ color: 'cyan', fontWeight: 'bold', textDecoration:'none' }}>{m.Title}</Link>
                            <br/><small>{m.Genre}</small>
                            <img src={m.PosterURL} alt={m.Title} style={{ width: '100%', marginTop: '10px', borderRadius: '4px' }} />
                        </div>
                    ))
                }
            </div>

                    <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>🎵 Bài hát tìm thấy ({results.songs.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> {/* Đổi ul thành div flex cho đẹp */}
                {results.songs.length === 0 ? <p style={{color:'#777'}}>Không tìm thấy bài hát nào.</p> :
                    results.songs.map(s => (
                        <div key={s.SongID} style={{ background: '#222', padding: '10px', borderRadius: '5px', border: '1px solid #333' }}>
                            {/* Dùng Link bao quanh tên bài hát */}
                            <Link to={`/song/${s.SongID}`} style={{ color: '#ffcc00', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                {s.Title}
                            </Link>
                            <span style={{ color: '#aaa', marginLeft: '10px' }}> - {s.Artist}</span>
                        </div>
                    ))
    }
</div>
        </div>
    );
}

export default SearchPage;