document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const img = document.createElement("img");
  lightbox.appendChild(img);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  lightbox.appendChild(closeBtn);

  const prevBtn = document.createElement("span");
  prevBtn.classList.add("prev");
  prevBtn.innerHTML = "&#10094;";
  lightbox.appendChild(prevBtn);

  const nextBtn = document.createElement("span");
  nextBtn.classList.add("next");
  nextBtn.innerHTML = "&#10095;";
  lightbox.appendChild(nextBtn);

  let currentIndex = 0;

  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      lightbox.style.display = "flex";
      img.src = image.src;
      currentIndex = index;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = images[currentIndex].src;
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex].src;
  });
});
