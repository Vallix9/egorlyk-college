document.addEventListener('DOMContentLoaded', function() {
    const sliderImage = document.getElementById('slider-image');
    const prevButton = document.getElementById('prev-button');//слайдер
    const nextButton = document.getElementById('next-button');

    const video = document.getElementById('video-player');
    const playPauseButton = document.getElementById('play-pause');
    const volumeButton = document.getElementById('volume');
    const volumeSlider = document.getElementById('volume-slider');   //видео
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const fullscreenButton = document.getElementById('fullscreen');

    const sliderContainer = document.querySelector('.comfortable-learning-slider-container');
    const slider = document.querySelector('.comfortable-learning-slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton1 = document.getElementById('comfort-prev');        //слайдер2
    const nextButton1 = document.getElementById('comfort-next');

    let slideIndex = 0;
    const slideWidth = slides[0].offsetWidth; // Ширина одного слайда

    let isPlaying = false;
    let isMuted = false;
  
    const images = [
      'assets/images/slider/pam.jpg',
      'assets/images/slider/photo.jpg',
      'assets/images/slider/jen.jpg'
    ];
  
    let currentIndex = 0;
  
    function updateSlider() {
      sliderImage.src = images[currentIndex];
    }
  
    prevButton.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    });
  
    nextButton.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    });
    // Функция для форматирования времени в формат "минуты:секунды"
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    // Обработчик события для кнопки Play/Pause
    playPauseButton.addEventListener('click', function () {
        if (isPlaying) {
            video.pause();
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
        } else {
            video.play();
            playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    // Обработчик события для кнопки Volume
    volumeButton.addEventListener('click', function () {
        if (isMuted) {
            video.muted = false;
            volumeButton.innerHTML = '<i class="fa fa-volume-up"></i>';
            volumeSlider.value = video.volume;
        } else {
            video.muted = true;
            volumeButton.innerHTML = '<i class="fa fa-volume-off"></i>';
            volumeSlider.value = 0;
        }
        isMuted = !isMuted;
    });

    // Обработчик события для слайдера Volume
    volumeSlider.addEventListener('input', function () {
        video.volume = volumeSlider.value;
        if (video.volume === 0) {
            volumeButton.innerHTML = '<i class="fa fa-volume-off"></i>';
            isMuted = true;
        } else {
            volumeButton.innerHTML = '<i class="fa fa-volume-up"></i>';
            isMuted = false;
        }
    });

    // Обновление текущего времени и продолжительности видео
    video.addEventListener('timeupdate', function () {
        currentTimeDisplay.textContent = formatTime(video.currentTime);
        durationDisplay.textContent = formatTime(video.duration);
    });

    // Обновление продолжительности после загрузки метаданных
    video.addEventListener('loadedmetadata', function () {
        durationDisplay.textContent = formatTime(video.duration);
    });

    // Переключение в полноэкранный режим
    fullscreenButton.addEventListener('click', function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari & Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    });

    // Функция для перемещения слайдера
    function moveSlider() {
        slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }

    // Обработчик события для кнопки "Предыдущий"
    prevButton1.addEventListener('click', function() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        moveSlider();
    });

    // Обработчик события для кнопки "Следующий"
    nextButton1.addEventListener('click', function() {
        slideIndex = (slideIndex + 1) % slides.length;
        moveSlider();
    });

    // Автоматическая прокрутка (необязательно)
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        moveSlider();
    }, 5000); // Каждые 5 секунд

    // Scroll to top button
    let scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    function toggleScrollBtn() {
        if (window.scrollY > 200) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
    window.addEventListener('scroll', toggleScrollBtn);
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Бургер-меню =====
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('nav.main-nav ul');
    if (burger && navMenu) {
        burger.addEventListener('click', function(e) {
            burger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
        // Закрытие меню при клике на ссылку
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
                burger.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }
});