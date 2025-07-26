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

// 💻 رمز ساده برای ورود مدیر
const adminPassword = "behroozi123";

function loginAdmin() {
  const inputPass = document.getElementById("adminPass").value;
  if (inputPass === adminPassword) {
    document.getElementById("adminComments").style.display = "block";
    loadAdminComments();
  } else {
    alert("رمز اشتباه است!");
  }
}

function loadAdminComments() {
  const list = document.getElementById("adminCommentsList");
  list.innerHTML = "";

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.forEach((c, i) => {
    const item = document.createElement("div");
    item.className = "comment-box";
    item.innerHTML = `
      <strong>${c.name}</strong>
      <small style="color:#777">${c.contact}</small>
      <p>${c.message}</p>
      <button class="delete-btn" onclick="deleteAdminComment(${i})">🗑 حذف</button>
    `;
    list.appendChild(item);
  });
}

function deleteAdminComment(index) {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadAdminComments();
  commentsList.innerHTML = ""; // به‌روز رسانی نمایش اصلی
  comments.forEach((c, i) => displayComment(c.name, c.contact, c.message, i));
}
