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


// تنظیمات API
const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";
const BIN_ID = "6888a52aae596e708fbd8f34";

// متغیرهای سراسری
let allComments = [];
let filteredComments = [];
let currentFilter = 'all';

// ورود مدیر
function loginAdmin() {
  const password = document.getElementById("adminPassword").value.trim();
  const errorElement = document.getElementById("loginError");
  
  if (!password) {
    showError("لطفاً رمز عبور را وارد کنید", errorElement);
    return;
  }
  
  if (password === "1234") {
    // انیمیشن خروج از صفحه ورود
    document.querySelector(".admin-login").style.transform = "scale(0.9)";
    document.querySelector(".admin-login").style.opacity = "0";
    
    setTimeout(() => {
      document.querySelector(".admin-login").classList.add("hidden");
      document.getElementById("adminPanel").classList.remove("hidden");
      
      // انیمیشن ورود به پنل
      const panel = document.getElementById("adminPanel");
      panel.style.opacity = "0";
      panel.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        panel.style.transition = "all 0.5s ease";
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
      }, 100);
      
      // بارگذاری نظرات
      loadComments();
    }, 300);
  } else {
    showError("رمز عبور نادرست است!", errorElement);
    
    // انیمیشن لرزش برای ورودی اشتباه
    const input = document.getElementById("adminPassword");
    input.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      input.style.animation = "";
    }, 500);
  }
}

// خروج از پنل
function logoutAdmin() {
  if (confirm("آیا مطمئن هستید که می‌خواهید خارج شوید؟")) {
    // انیمیشن خروج
    const panel = document.getElementById("adminPanel");
    panel.style.transform = "scale(0.95)";
    panel.style.opacity = "0";
    
    setTimeout(() => {
      panel.classList.add("hidden");
      document.querySelector(".admin-login").classList.remove("hidden");
      
      // ری‌ست فرم ورود
      document.getElementById("adminPassword").value = "";
      document.getElementById("loginError").textContent = "";
      
      // انیمیشن ورود به صفحه لاگین
      const login = document.querySelector(".admin-login");
      login.style.transform = "scale(1)";
      login.style.opacity = "1";
    }, 300);
  }
}

// نمایش خطا
function showError(message, element) {
  element.textContent = message;
  element.style.opacity = "0";
  element.style.transform = "translateY(-10px)";
  
  setTimeout(() => {
    element.style.transition = "all 0.3s ease";
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }, 100);
}

// نمایش لودینگ
function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

// مخفی کردن لودینگ
function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

// بارگذاری نظرات
async function loadComments() {
  showLoading();
  
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json"
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    allComments = data.record.comments || [];
    
    // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
    allComments.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    
    updateStats();
    filterComments();
    
  } catch (error) {
    console.error("خطا در بارگذاری نظرات:", error);
    showNotification("خطا در بارگذاری نظرات. لطفاً دوباره تلاش کنید.", "error");
  } finally {
    hideLoading();
  }
}

// آپدیت آمار
function updateStats() {
  const total = allComments.length;
  const pending = allComments.filter(comment => !comment.approved).length;
  const approved = allComments.filter(comment => comment.approved).length;
  
  // انیمیشن شمارش
  animateCounter("totalComments", total);
  animateCounter("pendingComments", pending);
  animateCounter("approvedComments", approved);
}

// انیمیشن شمارنده
function animateCounter(elementId, targetValue) {
  const element = document.getElementById(elementId);
  const currentValue = parseInt(element.textContent) || 0;
  const increment = targetValue > currentValue ? 1 : -1;
  const duration = 1000; // 1 ثانیه
  const steps = Math.abs(targetValue - currentValue);
  const stepDuration = steps > 0 ? duration / steps : 0;
  
  let current = currentValue;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    
    if (current === targetValue) {
      clearInterval(timer);
    }
  }, stepDuration);
}

// تنظیم فیلتر
function setFilter(filter) {
  currentFilter = filter;
  
  // آپدیت دکمه‌های فیلتر
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  filterComments();
}

// فیلتر کردن نظرات
function filterComments() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
  // فیلتر بر اساس وضعیت
  switch (currentFilter) {
    case 'pending':
      filteredComments = allComments.filter(comment => !comment.approved);
      break;
    case 'approved':
      filteredComments = allComments.filter(comment => comment.approved);
      break;
    default:
      filteredComments = [...allComments];
  }
  
  // فیلتر بر اساس جستجو
  if (searchTerm) {
    filteredComments = filteredComments.filter(comment => 
      comment.name.toLowerCase().includes(searchTerm) ||
      comment.email.toLowerCase().includes(searchTerm) ||
      comment.message.toLowerCase().includes(searchTerm) ||
      (comment.ip && comment.ip.includes(searchTerm))
    );
  }
  
  displayComments();
}

// نمایش نظرات
function displayComments() {
  const commentList = document.getElementById("commentList");
  const emptyState = document.getElementById("emptyState");
  
  if (filteredComments.length === 0) {
    commentList.style.display = "none";
    emptyState.classList.remove("hidden");
    return;
  }
  
  commentList.style.display = "block";
  emptyState.classList.add("hidden");
  commentList.innerHTML = "";
  
  filteredComments.forEach((comment, index) => {
    const originalIndex = allComments.findIndex(c => 
      c.name === comment.name && 
      c.email === comment.email && 
      c.message === comment.message &&
      c.date === comment.date
    );
    
    const commentCard = createCommentCard(comment, originalIndex);
    commentList.appendChild(commentCard);
  });
  
  // انیمیشن ورود کارت‌ها
  const cards = commentList.querySelectorAll('.comment-card');
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// ایجاد کارت نظر
function createCommentCard(comment, index) {
  const div = document.createElement("div");
  div.className = `comment-card ${comment.approved ? 'approved' : 'pending'}`;
  
  const formatDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  div.innerHTML = `
    <div class="status-badge">
      ${comment.approved ? '✅ تأیید شده' : '⏳ در انتظار تأیید'}
    </div>
    
    <p><strong>👤 نام کاربر:</strong> ${escapeHtml(comment.name)}</p>
    <p><strong>📧 ایمیل/تلفن:</strong> ${escapeHtml(comment.email)}</p>
    <p><strong>🌐 آدرس IP:</strong> <code>${comment.ip || 'نامشخص'}</code></p>
    <p><strong>📅 تاریخ ارسال:</strong> ${formatDate(comment.date)}</p>
    
    <div class="message-text">
      <strong>💬 متن نظر:</strong><br>
      ${escapeHtml(comment.message)}
    </div>
    
    <div class="actions">
      ${!comment.approved ? `
        <button class="approve-btn" onclick="approveComment(${index})">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
          </svg>
          تأیید نظر
        </button>
      ` : ''}
      
      <button class="delete-btn" onclick="deleteComment(${index})">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
        </svg>
        حذف نظر
      </button>
    </div>
  `;
  
  return div;
}

// escape کردن HTML برای امنیت
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// تأیید نظر
async function approveComment(index) {
  if (!confirm("آیا مطمئن هستید که می‌خواهید این نظر را تأیید کنید؟")) {
    return;
  }
  
  showLoading();
  
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });
    
    const data = await response.json();
    data.record.comments[index].approved = true;
    data.record.comments[index].approvedDate = new Date().toISOString();
    
    const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(data.record),
    });
    
    if (updateResponse.ok) {
      showNotification("نظر با موفقیت تأیید شد!", "success");
      loadComments();
    } else {
      throw new Error('خطا در تأیید نظر');
    }
    
  } catch (error) {
    console.error("خطا در تأیید نظر:", error);
    showNotification("خطا در تأیید نظر. لطفاً دوباره تلاش کنید.", "error");
  } finally {
    hideLoading();
  }
}

// حذف نظر
async function deleteComment(index) {
  if (!confirm("آیا مطمئن هستید که می‌خواهید این نظر را حذف کنید؟\n\n⚠️ این عمل غیرقابل بازگشت است!")) {
    return;
  }
  
  showLoading();
  
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });
    
    const data = await response.json();
    data.record.comments.splice(index, 1);
    
    const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(data.record),
    });
    
    if (updateResponse.ok) {
      showNotification("نظر با موفقیت حذف شد!", "success");
      loadComments();
    } else {
      throw new Error('خطا در حذف نظر');
    }
    
  } catch (error) {
    console.error("خطا در حذف نظر:", error);
    showNotification("خطا در حذف نظر. لطفاً دوباره تلاش کنید.", "error");
  } finally {
    hideLoading();
  }
}

// نمایش نوتیفیکیشن
function showNotification(message, type = 'info') {
  // ایجاد المنت نوتیفیکیشن
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">
        ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span class="notification-message">${message}</span>
    </div>
  `;
  
  // استایل نوتیفیکیشن
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    backdrop-filter: blur(10px);
    ${type === 'success' ? 'background: linear-gradient(135deg, #27ae60, #2ecc71);' : ''}
    ${type === 'error' ? 'background: linear-gradient(135deg, #e74c3c, #c0392b);' : ''}
    ${type === 'info' ? 'background: linear-gradient(135deg, #3498db, #2980b9);' : ''}
  `;
  
  document.body.appendChild(notification);
  
  // انیمیشن ورود
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // حذف خودکار بعد از 3 ثانیه
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// ایونت لیسنرها
document.addEventListener('DOMContentLoaded', function() {
  // Enter برای ورود
  document.getElementById('adminPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      loginAdmin();
    }
  });
  
  // جستجو در نظرات
  document.getElementById('searchInput').addEventListener('input', function() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      filterComments();
    }, 300);
  });
  
  // میانبرهای کیبورد
  document.addEventListener('keydown', function(e) {
    // Ctrl+R یا F5 برای بروزرسانی
    if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
      e.preventDefault();
      loadComments();
    }
    
    // Escape برای پاک کردن جستجو
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('searchInput');
      if (searchInput.value) {
        searchInput.value = '';
        filterComments();
      }
    }
  });
});

// انیمیشن لرزش برای CSS
const shakeAnimation = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

// اضافه کردن انیمیشن به صفحه
const style = document.createElement('style');
style.textContent = shakeAnimation;
document.head.appendChild(style);