// انتخاب المنت‌ها
const menuToggle = document.getElementById('menuToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuItems = document.querySelectorAll('.menu-item');

// تابع باز و بسته کردن منو
function toggleMenu() {
    menuToggle.classList.toggle('active');
    sidebarMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // جلوگیری از اسکرول زمانی که منو باز است
    if (sidebarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// تابع بستن منو
function closeMenu() {
    menuToggle.classList.remove('active');
    sidebarMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ایونت لیسنر برای دکمه همبرگر
menuToggle.addEventListener('click', toggleMenu);

// ایونت لیسنر برای اورلی
menuOverlay.addEventListener('click', closeMenu);

// بستن منو با کلید Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
        closeMenu();
    }
});

// ایونت لیسنر برای آیتم‌های منو
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // افکت کلیک
        this.style.transform = 'translateX(12px) scale(0.98)';
        
        setTimeout(() => {
            this.style.transform = 'translateX(8px) scale(1)';
            closeMenu();
            
            // شبیه‌سازی رفتن به صفحه جدید
            setTimeout(() => {
                alert('رفتن به: ' + this.textContent.trim());
            }, 300);
        }, 150);
    });
    
    // افکت هاور اضافی
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// انیمیشن smooth برای اسکرول
document.documentElement.style.scrollBehavior = 'smooth';

// تشخیص سایز صفحه برای ریسپانسیو
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sidebarMenu.classList.contains('active')) {
        // اگر صفحه بزرگ شد و منو باز بود
        if (window.innerWidth > 1200) {
            // در صفحات بزرگ
        }
    }
});

// افکت پارالکس ساده برای بک‌گراند
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.backgroundPosition = `center ${rate}px`;
});

// لود شدن صفحه
document.addEventListener('DOMContentLoaded', function() {
    // انیمیشن ورود برای محتوای اصلی
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        mainContent.style.transition = 'all 1s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 500);
});

// تابع برای تغییر تم (اختیاری)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

// افکت کلیک روی دکمه همبرگر
menuToggle.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
});

menuToggle.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1.05)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 100);
});

// جلوگیری از کلیک راست روی منو
sidebarMenu.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

console.log('منوی کشویی با موفقیت لود شد! 🎉');

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
