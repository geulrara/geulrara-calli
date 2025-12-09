// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Class card hover effect enhancement
const classCards = document.querySelectorAll('.class-card');
classCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const imageOverlay = document.querySelector('.hero .image-overlay');

    if (hero && scrolled < window.innerHeight) {
        // 배경 이미지 parallax 효과 (약간의 이동)
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;

        // 오버레이 투명도 조절
        if (imageOverlay) {
            const opacity = 0.6 - (scrolled / window.innerHeight) * 0.2;
            imageOverlay.style.opacity = Math.max(opacity, 0.4);
        }
    }
});

// Naver Map Initialization
function initMap() {
    // 부천시 원미구 장말로315번길 12 좌표 (대략적인 좌표, 실제로는 geocoding API 사용 권장)
    const studioAddress = '경기 부천시 원미구 장말로315번길 12';

    // 네이버 지도 API가 로드되었는지 확인
    if (typeof naver === 'undefined' || !naver.maps) {
        console.warn('네이버 지도 API가 로드되지 않았습니다. API 키를 확인해주세요.');
        // 플레이스홀더 표시
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
            mapDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #999; flex-direction: column;">
                    <p>네이버 지도 API 키를 설정해주세요</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">index.html의 YOUR_CLIENT_ID를 실제 클라이언트 ID로 변경하세요</p>
                </div>
            `;
        }
        return;
    }

    // 주소로 좌표 검색
    naver.maps.Service.geocode({
        query: studioAddress
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            console.error('주소 검색 실패');
            return;
        }

        if (response.v2.meta.totalCount === 0) {
            console.error('검색 결과가 없습니다');
            return;
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(parseFloat(item.x), parseFloat(item.y));

        // 지도 생성
        const mapOptions = {
            center: point,
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            }
        };

        const map = new naver.maps.Map('map', mapOptions);

        // 마커 생성
        const marker = new naver.maps.Marker({
            position: point,
            map: map,
            icon: {
                content: `
                    <div style="background: #d4af37; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                        <span style="font-size: 24px;">✍️</span>
                    </div>
                `,
                anchor: new naver.maps.Point(25, 25)
            }
        });

        // 정보창 생성
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 10px; min-width: 200px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 16px; color: #2c3e50;">Geulrara Calligraphy</h3>
                    <p style="margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.6;">
                        ${studioAddress}<br>
                        더파크힐2차아파트 상가2동 2층
                    </p>
                </div>
            `,
            backgroundColor: 'white',
            borderColor: '#d4af37',
            borderWidth: 2
        });

        // 마커 클릭 시 정보창 표시
        naver.maps.Event.addListener(marker, 'click', function() {
            if (infoWindow.getMap()) {
                infoWindow.close();
            } else {
                infoWindow.open(map, marker);
            }
        });

        // 지도 로드 시 정보창 자동 표시
        infoWindow.open(map, marker);
    });
}

// 페이지 로드 시 지도 초기화
window.addEventListener('load', () => {
    // 네이버 지도 API 로드 대기
    if (typeof naver !== 'undefined' && naver.maps) {
        initMap();
    } else {
        // API가 아직 로드되지 않았으면 대기
        let checkCount = 0;
        const checkInterval = setInterval(() => {
            checkCount++;
            if (typeof naver !== 'undefined' && naver.maps) {
                clearInterval(checkInterval);
                initMap();
            } else if (checkCount > 50) { // 5초 후 타임아웃
                clearInterval(checkInterval);
                initMap(); // 플레이스홀더 표시
            }
        }, 100);
    }
});

