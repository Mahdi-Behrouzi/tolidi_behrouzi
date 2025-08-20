
// منوی کشویی
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;
    const menuItems = document.querySelectorAll('.menu-item');

    // باز و بسته کردن منو
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        sidebarMenu.classList.toggle('active');
        body.classList.toggle('menu-open');

        // انیمیشن آیتم‌های منو
        if (sidebarMenu.classList.contains('active')) {
            setTimeout(() => {
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
            }, 200);
        } else {
            menuItems.forEach(item => {
                item.classList.remove('animate');
            });
        }
    }

    // کلیک روی دکمه همبرگر
    menuToggle.addEventListener('click', toggleMenu);

    // کلیک روی پوشش تیره برای بستن منو
    menuOverlay.addEventListener('click', function() {
        if (sidebarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // بستن منو با کلید Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // کلیک روی آیتم‌های منو
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // افکت کلیک
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // اگه می‌خوای منو بعد از کلیک بسته بشه این خط رو فعال کن:
            // toggleMenu();
        });
    });

    // تشخیص تغییر اندازه صفحه
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
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

