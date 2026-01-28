import React from 'react';
import { Link } from 'react-router-dom';
// 1. Import thư viện Splide
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import CSS mặc định

// 2. Danh sách các Slide nổi bật (Bạn có thể thêm tùy thích)
const HERO_SLIDES = [
    {
        id: 1, 
        type: 'movie',
        title: "MAI",
        description: "Câu chuyện về cuộc đời trắc trở của cô gái tên Mai...",
        image: "/img/mai-poster.jpg" 
        
    },
    {
        id: 4, 
        type: 'movie',
        title: "AVENGERS: ENDGAME",
        description: "Trận chiến cuối cùng của biệt đội siêu anh hùng...",
        image: "/img/endgame.jpg" 
    },
    {
        id: 30, 
        type: 'movie',
        title: "YOUR NAME",
        description: "Câu chuyện hoán đổi thân xác kỳ diệu giữa hai người xa lạ...",
        image: "/img/Your_Name.jpg" 
    },
    {
        id: 7, 
        type: 'song', // Có thể slide cả nhạc
        title: "CHÚNG TA CỦA HIỆN TẠI",
        description: "Bản hit đình đám của Sơn Tùng M-TP...",
        image: "/song/chungtacuahientai.jpg" 
    }
];

function HeroSection() {
    return (
        <div className="hero-wrapper">
            <Splide options={{
                type: 'fade',       // Hiệu ứng mờ dần (sang hơn trượt)
                rewind: true,       // Quay lại đầu khi hết
                autoplay: true,     // Tự động chạy
                interval: 4000,     // 4 giây chuyển 1 lần
                arrows: false,      // Ẩn mũi tên (để giao diện sạch)
                pagination: true,   // Hiện chấm tròn bên dưới
                pauseOnHover: false,// Không dừng khi di chuột
                height: '85vh',     // Chiều cao cố định
                waitForTransition: false,
                rewindSpeed: 1000,
                speed: 1000,
           }}>
                {HERO_SLIDES.map((item) => (
                    <SplideSlide key={item.id}>
                        {/* --- BỐ CỤC TỪNG SLIDE --- */}
                        <div style={{ 
                            height: '85vh', 
                            width: '100%',
                            backgroundImage: `url('${item.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top',
                            position: 'relative'
                        }}>
                            {/* Lớp phủ Gradient để làm nổi bật chữ */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to top, #141414 5%, rgba(20,20,20,0.6) 50%, rgba(0,0,0,0.4) 100%)'
                            }}></div>

                            {/* Nội dung chữ */}
                            <div style={{
                                position: 'absolute',
                                bottom: '25%',
                                left: '5%',
                                maxWidth: '700px',
                                zIndex: 10,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                            }}>
                                {/* Nhãn loại (Phim/Nhạc) */}
                                <span style={{
                                    backgroundColor: item.type === 'movie' ? '#e50914' : '#1db954',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {item.type === 'movie' ? 'Phim Lẻ' : 'Bài Hát'}
                                </span>

                                <h1 style={{ 
                                    fontSize: '4.5rem', 
                                    margin: '15px 0', 
                                    lineHeight: '1.1',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    fontFamily: "'Arial Black', sans-serif"
                                }}>
                                    {item.title}
                                </h1>

                                <p style={{ 
                                    fontSize: '1.3rem', 
                                    color: '#e5e5e5', 
                                    marginBottom: '30px',
                                    lineHeight: '1.5',
                                    maxWidth: '80%'
                                }}>
                                    {item.description}
                                </p>

                                {/* Nút bấm */}
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Link to={`/${item.type}/${item.id}`}>
                                        <button style={{
                                            padding: '12px 35px',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            background: 'white',
                                            color: 'black',
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            transition: '0.3s'
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                        >
                                            ▶ Phát Ngay
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

export default HeroSection;