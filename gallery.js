/* ================== کدهای جاوااسکریپت منو/هدر ================== */
// MENU_JS_PLACEHOLDER
// HEADER_JS_PLACEHOLDER

/* ================== کدهای جاوااسکریپت فوتر ================== */
// FOOTER_JS_PLACEHOLDER

// ------------------ کد مربوط به گالری ------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-item").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    caption.innerText = img.alt;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
