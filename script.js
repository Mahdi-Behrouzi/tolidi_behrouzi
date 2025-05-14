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
  const slides = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  // تغییر خودکار هر 3 ثانیه
  setInterval(nextSlide, 3000);
</script>
