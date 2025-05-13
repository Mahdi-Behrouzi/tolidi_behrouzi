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
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // تغییر هر ۲ ثانیه
}




<script>
  const images = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--1-min-min.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--2-min-min.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--3-min-min.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--4-min-min.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--5-min-min.jpg'
  ];

  let currentIndex = 0;
  const sliderImage = document.getElementById('sliderImage');

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    sliderImage.style.opacity = 0;
    setTimeout(() => {
      sliderImage.src = images[currentIndex];
      sliderImage.style.opacity = 1;
    }, 500);
  }, 2000);
</script>
