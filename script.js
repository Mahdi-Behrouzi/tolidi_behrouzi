const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mainNav.classList.toggle('open');
});


const slides = document.querySelectorAll(".fullscreen-slider .slide");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

setInterval(nextSlide, 3000); // هر ۳ ثانیه

document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const message = document.getElementById("message").value.trim();
  const successMsg = document.getElementById("successMsg");

  const isPhone = /^09\d{9}$/.test(contact);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  if (!isPhone && !isEmail) {
    alert("لطفاً یک ایمیل معتبر یا شماره موبایل ۱۱ رقمی وارد کنید.");
    return;
  }

  const commentDiv = document.createElement("div");
  commentDiv.innerHTML = `<strong>${name}</strong><br>${message}`;
  document.getElementById("commentsList").appendChild(commentDiv);

  document.getElementById("commentForm").reset();
  successMsg.style.display = "block";
  setTimeout(() => (successMsg.style.display = "none"), 3000);
});

