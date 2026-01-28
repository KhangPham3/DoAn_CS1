import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, image, title, subtitle, type = 'movie' }) => {
  // Xác định đường dẫn dựa trên loại (phim hay nhạc)
  const linkTo = type === 'movie' ? `/movie/${id}` : `/song/${id}`;
  
  // Xác định màu accent (Đỏ cho phim, Xanh cho nhạc)
  const accentColor = type === 'movie' ? 'var(--primary-movie)' : 'var(--primary-music)';

  return (
    <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card-ui">
        {/* Phần Ảnh */}
        <div style={{ 
            aspectRatio: type === 'movie' ? '2/3' : '1/1', // Phim: Chữ nhật đứng, Nhạc: Vuông
            overflow: 'hidden',
            position: 'relative'
        }}>
          <img 
            src={image || "https://via.placeholder.com/300?text=No+Image"} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          
          {/* Nút Play hiện khi Hover (Hiệu ứng Netflix) */}
          <div className="play-overlay" style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: '0.3s'
          }}
            onMouseOver={e => e.currentTarget.style.opacity = 1}
            onMouseOut={e => e.currentTarget.style.opacity = 0}
          >
            <div style={{ 
                background: accentColor, color: type === 'movie' ? 'white' : 'black',
                width: 50, height: 50, borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 
            }}>▶</div>
          </div>
        </div>
        
        {/* Phần Chữ */}
        <div style={{ padding: '15px' }}>
          <h3 style={{ 
            margin: '0 0 5px 0', 
            fontSize: '1rem', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            color: 'white'
          }}>
            {title}
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-gray)' }}>
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;