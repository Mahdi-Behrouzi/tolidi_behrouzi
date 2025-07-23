// منو همبرگری
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
  if (sideMenu.classList.contains('open')) {
    sideMenu.classList.remove('open');
    menuBtn.innerHTML = '&#9776;';
  } else {
    sideMenu.classList.add('open');
    menuBtn.innerHTML = '&times;';
  }
});

function closeMenu() {
  sideMenu.classList.remove('open');
  menuBtn.innerHTML = '&#9776;';
}

// اسلایدر
const slides = document.querySelectorAll('.slider img');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 2000);

// دکمه‌های رنگی
const colorBtns = document.querySelectorAll('.color-btn');

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    colorBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
