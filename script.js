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

const BIN_ID = '6888a52aae596e708fbd8f34';
const API_KEY = '$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// ارسال نظر جدید
document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) return;

  const newComment = {
    name,
    email,
    message,
    approved: false,
    createdAt: new Date().toISOString(),
    ip: "" // در سمت کلاینت نمی‌شه IP گرفت، فقط سرور می‌تونه.
  };

  fetch(BIN_URL + "/latest", {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY
    }
  })
    .then(res => res.json())
    .then(data => {
      const comments = data.record.comments || [];
      comments.push(newComment);

      return fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ comments })
      });
    })
    .then(() => {
      document.getElementById("commentForm").reset();
      document.getElementById("commentSuccess").style.display = "block";
    })
    .catch(err => {
      alert("❌ خطا در ثبت نظر.");
      console.error(err);
    });
});

// نمایش فقط نظرات تأییدشده
function displayApprovedComments() {
  fetch(BIN_URL + "/latest", {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY
    }
  })
    .then(res => res.json())
    .then(data => {
      const comments = data.record.comments || [];
      const approved = comments.filter(c => c.approved);

      const container = document.getElementById("approvedComments");
      container.innerHTML = "";

      approved.reverse().forEach(c => {
        const card = document.createElement("div");
        card.className = "comment-card";
        card.innerHTML = `<strong>${c.name}</strong><p>${c.message}</p>`;
        container.appendChild(card);
      });
    });
}

displayApprovedComments();
