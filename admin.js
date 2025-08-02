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

const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";
const BIN_ID = "6888a52aae596e708fbd8f34";

function loginAdmin() {
  const pass = document.getElementById("adminPassword").value;
  if (pass === "1234") {
    document.querySelector(".admin-login").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    loadComments();
  } else {
    document.getElementById("loginError").textContent = "رمز نادرست است!";
  }
}

async function loadComments() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY,
    },
  });
  const data = await res.json();
  const comments = data.record.comments || [];
  const list = document.getElementById("commentList");
  list.innerHTML = "";

  comments.forEach((comment, i) => {
    const div = document.createElement("div");
    div.className = "comment-card";
    div.innerHTML = `
      <p><strong>👤 نام:</strong> ${comment.name}</p>
      <p><strong>📧 ایمیل/تلفن:</strong> ${comment.email}</p>
      <p><strong>💬 نظر:</strong> ${comment.message}</p>
      <p><strong>🌐 آی‌پی:</strong> ${comment.ip || 'نامشخص'}</p>
      <div class="actions">
        ${!comment.approved ? `<button onclick="approveComment(${i})">✅ تأیید</button>` : ""}
        <button onclick="deleteComment(${i})">🗑 حذف</button>
      </div>
    `;
    list.appendChild(div);
  });
}

async function approveComment(index) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  data.record.comments[index].approved = true;

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(data.record),
  });
  loadComments();
}

async function deleteComment(index) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  data.record.comments.splice(index, 1);

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(data.record),
  });
  loadComments();
}
