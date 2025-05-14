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

<script>
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  // Swipe Detection
  let startX = 0;

  document.querySelector('.slider').addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  });

  document.querySelector('.slider').addEventListener('touchend', function (e) {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      // swipe left
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (endX - startX > 50) {
      // swipe right
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  });
</script>
