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

const form = document.getElementById("commentForm");
const successMessage = document.getElementById("commentSuccess");

const BIN_URL = "https://api.jsonbin.io/v3/b/68867c9cf7e7a370d1eed4fc";
const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";

// اعتبارسنجی ایمیل یا شماره تلفن
function validateContact(input) {
  const phoneRegex = /^09\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return phoneRegex.test(input) || emailRegex.test(input);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!validateContact(contact)) {
    alert("ایمیل یا شماره تلفن معتبر وارد کنید.");
    return;
  }

  fetch(BIN_URL + "/latest", {
    headers: { "X-Master-Key": API_KEY },
  })
    .then(res => res.json())
    .then(data => {
      const comments = data.record || [];
      const newComment = {
        name,
        contact,
        message,
        time: new Date().toLocaleString()
      };
      comments.push(newComment);

      return fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify(comments)
      });
    })
    .then(() => {
      form.reset();
      successMessage.style.display = "block";
      setTimeout(() => successMessage.style.display = "none", 3000);
    })
    .catch(err => alert("❌ خطا در ذخیره نظر"));
});


