$(document).ready(function () {

    function toggleMenu() {
        const gnb = document.getElementById('gnb');
        gnb.classList.toggle('active');
    }

    // 페이지 로드 시 애니메이션 지연
    window.addEventListener('load', function () {
        document.body.style.opacity = '1';
    });

    // 데이터 섹션 카운터 애니메이션
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                element.classList.add('animate');
            }
        }

        updateCounter();
    }

    // Intersection Observer로 뷰포트에 들어올 때 애니메이션 실행
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const dataObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');

                counters.forEach((counter, index) => {
                    const target = parseInt(counter.getAttribute('data-target'));

                    setTimeout(() => {
                        animateCounter(counter, target);
                    }, index * 200);
                });

                dataObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 데이터 섹션이 있으면 관찰 시작
    const dataSection = document.getElementById('data');
    if (dataSection) {
        dataObserver.observe(dataSection);
    }

    const swiper = new Swiper('.swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true, // 추가
        loop: true,
        loopAdditionalSlides: 2,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        speed: 600,
        effect: 'slide',
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
                centeredSlides: true,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 25,
                centeredSlides: true,
            },
        }
    });
});