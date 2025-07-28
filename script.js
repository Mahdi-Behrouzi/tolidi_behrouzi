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

console.log("📢 script.js لود شد");

document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("📨 ارسال فرم کلیک شد");

  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !contact || !message) {
    alert("لطفاً همه فیلدها را پر کنید.");
    return;
  }

  const phoneRegex = /^09\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!phoneRegex.test(contact) && !emailRegex.test(contact)) {
    alert("شماره یا ایمیل معتبر نیست.");
    return;
  }

  alert("✔️ فرم با موفقیت ارسال شد (ولی ذخیره نمی‌کنیم هنوز)");

  // اینجا می‌تونی اتصال به JSONBin رو بعداً بذاری
});


