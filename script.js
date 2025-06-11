// اسلایدر خودکار
let currentSlide = 0;
const slides = document.querySelectorAll(".slides img");

function showNextSlide() {
  slides[currentSlide].style.display = "none";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].style.display = "block";
}
setInterval(showNextSlide, 3000);

// دکمه بازگشت به بالا
window.onscroll = function() {
  document.querySelector('.to-top').style.display = 
    window.scrollY > 300 ? 'block' : 'none';
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
