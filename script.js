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

<script>
  document.getElementById("commentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const emailOrPhone = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const name = document.getElementById("name").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+98|0)?9\d{9}$/;

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      alert("لطفاً یک ایمیل معتبر یا شماره موبایل صحیح وارد کنید.");
      return;
    }

    if (message === "" || name === "") {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    // اگر اعتبارسنجی درست بود
    document.getElementById("commentSuccess").style.display = "block";
    this.reset();
  });
</script>

