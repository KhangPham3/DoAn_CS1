import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#000',
      color: '#b3b3b3',
      padding: '50px 4% 20px',
      marginTop: 'auto', // Đẩy footer xuống đáy nếu nội dung ngắn
      borderTop: '1px solid #333',
      fontSize: '0.9rem'
    }}>
      
      {/* --- PHẦN TRÊN: 3 CỘT THÔNG TIN --- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        
        {/* Cột 1: Thông tin Admin / Web */}
        <div>
          <h3 style={{ color: 'white', textTransform: 'uppercase', marginBottom: '20px', fontSize: '1.1rem' }}>
            ABOUT US
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            Đồ án cơ sở 1 chuyên ngành CNTT, mang đến trải nghiệm giải trí đỉnh cao với kho phim và nhạc tuyển chọn.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
             {/* Icon Mạng xã hội giả lập */}
             <span style={iconStyle} onClick={() => window.open("https://www.facebook.com/MarVin0311/", "_blank")}>FB</span>
             <span style={iconStyle} onClick={() => window.open("https://www.instagram.com/khangpham_vnrg/", "_blank")}>IG</span>
             <span style={iconStyle} onClick={() => window.open("https://www.youtube.com/", "_blank")}>YT</span>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 style={{ color: 'white', textTransform: 'uppercase', marginBottom: '20px', fontSize: '1.1rem' }}>
            Khám Phá
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li><Link to="/" style={linkStyle}>Trang Chủ</Link></li>
            <li><Link to="/movies" style={linkStyle}>Phim Mới Cập Nhật</Link></li>
            <li><Link to="/songs" style={linkStyle}>Bảng Xếp Hạng Nhạc</Link></li>
            <li><Link to="/search" style={linkStyle}>Tìm Kiếm</Link></li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div>
          <h3 style={{ color: 'white', textTransform: 'uppercase', marginBottom: '20px', fontSize: '1.1rem' }}>
            Liên Hệ Admin
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li>👤 <strong>Admin:</strong> Khang Phạm</li>
            <li>📧 <strong>Email:</strong> khangphamforwork@gmail.com</li>
            <li>📞 <strong>Hotline:</strong> 0905.XXX.XXX</li>
            <li>🏢 <strong>Địa chỉ:</strong> Đại Học Nam Cần Thơ</li>
          </ul>
        </div>
      </div>

      {/* --- PHẦN DƯỚI: BẢN QUYỀN --- */}
      <div style={{
        borderTop: '1px solid #333',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '0.8rem'
      }}>
        <p>© 2026 ON-TUBE. Đồ án cơ sở ngành Công nghệ thông tin.</p>
        <p style={{ marginTop: '5px' }}>Designed by Phạm Trí Khang.</p>
      </div>
    </footer>
  );
}

// --- CSS IN JS (Để code gọn hơn) ---
const linkStyle = {
  color: '#b3b3b3',
  textDecoration: 'none',
  transition: 'color 0.3s'
};

const iconStyle = {
  width: '35px',
  height: '35px',
  background: '#333',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

export default Footer;