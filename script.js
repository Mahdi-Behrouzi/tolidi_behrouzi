const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuBtn.classList.toggle('open');
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

// فرم نظرات
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("comment-name").value;
  const text = document.getElementById("comment-text").value;

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  commentDiv.innerHTML = `<strong>${name}</strong><p>${text}</p>`;

  commentList.prepend(commentDiv);

  // پاک کردن فرم
  commentForm.reset();
});
