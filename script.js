const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
  // عوض کردن دکمه سه خطی به ضربدر و بالعکس
  if (nav.classList.contains('show')) {
    menuToggle.innerHTML = '&#10006;'; // ✖ ضربدر
  } else {
    menuToggle.innerHTML = '&#9776;';  // ☰ سه خط
  }
});
let slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
  index = (index + 1) % slides.length;
}

setInterval(showSlide, 2000);
