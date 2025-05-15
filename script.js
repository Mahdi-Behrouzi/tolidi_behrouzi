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
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let currentIndex = 0;
  let startX = 0;
  let isSwiping = false;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 2000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
      resetAutoSlide();
    });
  });

  prev.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  next.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  // Swipe support
  const slider = document.querySelector(".slider");

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    let diffX = e.touches[0].clientX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) prevSlide();
      else nextSlide();
      isSwiping = false;
      resetAutoSlide();
    }
  });

  slider.addEventListener("touchend", () => {
    isSwiping = false;
  });

  // Auto slide
  autoSlide = setInterval(nextSlide, 2000);
</script>
    
