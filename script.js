const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
  // عوض کردن دکمه سه خطی به ضربدر و بالعکس
  if (nav.classList.contains('show')) {
    menuToggle.innerHTML = '&#10006;'; // ✖ ضربدر
  } else {
    menuToggle.innerHTML = '&#9776;';  // ☰ سه خط
<script>
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');
  const slidesContainer = document.querySelector('.slides');
  let currentIndex = 0;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dots span');

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[index].classList.add('active-dot');

    currentIndex = index;
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  // Auto-slide
  setInterval(nextSlide, 2000);

  // Initial
  showSlide(0);

  // Swipe support
  let startX = 0;
  slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  });
</script>
    
