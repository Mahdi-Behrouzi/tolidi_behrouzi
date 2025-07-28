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

const BIN_ID = "68867c9cf7e7a370d1eed4fc";
const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";

document.getElementById("commentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const message = document.getElementById("message").value.trim();

  const phoneRegex = /^09\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!phoneRegex.test(contact) && !emailRegex.test(contact)) {
    alert("لطفاً شماره تلفن یا ایمیل معتبر وارد کنید.");
    return;
  }

  // دریافت آی‌پی
  const ip = await fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => data.ip)
    .catch(() => "IP نامشخص");

  const newComment = {
    name,
    contact,
    message,
    ip,
    time: new Date().toLocaleString("fa-IR")
  };

  // گرفتن نظرات قبلی
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });

  const data = await response.json();
  const comments = data.record || [];

  // اضافه کردن نظر جدید
  comments.push(newComment);

  // ذخیره در JSONBin
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(comments)
  });

  // نمایش پیام موفقیت
  document.getElementById("successMessage").style.display = "block";
  this.reset();

  loadComments();
});

async function loadComments() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });

  const data = await res.json();
  const comments = data.record || [];

  const container = document.getElementById("commentsList");
  container.innerHTML = "";

  comments.reverse().forEach(comment => {
    container.innerHTML += `
      <div class="comment-item">
        <strong>${comment.name}</strong> (${comment.contact})<br/>
        <small>${comment.time} - IP: ${comment.ip}</small>
        <p>${comment.message}</p>
      </div>
    `;
  });
}

loadComments();

