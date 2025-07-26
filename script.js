// دکمه منو موبایل
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('show');
});

// اسلایدر اتوماتیک
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // هر ۳ ثانیه یک‌بار

// سیستم ثبت نظر
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
const successMessage = document.getElementById('commentSuccess');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) return;

  // نمایش نظر
  const commentEl = document.createElement('div');
  commentEl.innerHTML = `
    <strong>${name}</strong> <small>(${email})</small>
    <p>${message}</p>
    <hr>
  `;
  commentsList.prepend(commentEl);

  // پاک‌سازی فرم
  commentForm.reset();

  // نمایش پیام موفقیت
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 4000);
});
