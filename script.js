const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

// بستن منو وقتی روی لینک‌ها کلیک می‌شه (برای تجربه بهتر موبایل)
function closeMenu() {
  sideMenu.classList.remove('open');
}

// اسلایدر
let slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

setInterval(showNextSlide, 2000);
