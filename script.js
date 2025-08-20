// کلاس مدیریت لودینگ
class LoadingManager {
    constructor() {
        this.overlay = document.getElementById('loadingOverlay');
        this.text = document.getElementById('loadingText');
        this.progressBar = document.getElementById('progressBar');
        this.progressPercent = document.getElementById('progressPercent');
        
        this.messages = [
            'در حال بارگذاری',
            'در حال اتصال به سرور',
            'دریافت اطلاعات',
            'پردازش داده‌ها',
            'در حال تکمیل',
            'تقریباً تمام شد'
        ];
        
        this.currentProgress = 0;
        this.targetProgress = 0;
        this.messageIndex = 0;
    }

    // نمایش لودینگ
    show() {
        this.overlay.style.display = 'flex';
        this.overlay.classList.remove('fade-out');
        this.startProgress();
        this.startMessageRotation();
        
        // قفل کردن اسکرول
        document.body.style.overflow = 'hidden';
    }

    // مخفی کردن لودینگ
    hide() {
        this.overlay.classList.add('fade-out');
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
            // باز کردن اسکرول
            document.body.style.overflow = 'auto';
        }, 500);
    }

    // شروع پیشرفت خودکار
    startProgress() {
        const interval = setInterval(() => {
            if (this.currentProgress < this.targetProgress) {
                this.currentProgress += Math.random() * 15 + 5;
                if (this.currentProgress > this.targetProgress) {
                    this.currentProgress = this.targetProgress;
                }
                this.updateProgress(this.currentProgress);
            }
        }, 200);

        // شبیه‌سازی مراحل مختلف بارگذاری
        setTimeout(() => this.targetProgress = 30, 500);
        setTimeout(() => this.targetProgress = 60, 1500);
        setTimeout(() => this.targetProgress = 85, 2500);
        setTimeout(() => {
            this.targetProgress = 100;
            this.updateProgress(100);
            setTimeout(() => this.complete(), 800);
            clearInterval(interval);
        }, 3500);
    }

    // چرخش پیام‌ها
    startMessageRotation() {
        const messageInterval = setInterval(() => {
            if (this.currentProgress < 100) {
                this.messageIndex = (this.messageIndex + 1) % this.messages.length;
                this.updateMessage(this.messages[this.messageIndex]);
            } else {
                clearInterval(messageInterval);
            }
        }, 600);
    }

    // بروزرسانی پیشرفت
    updateProgress(percent) {
        this.progressBar.style.width = percent + '%';
        this.progressPercent.textContent = Math.round(percent) + '%';
    }

    // بروزرسانی پیام
    updateMessage(message) {
        this.text.innerHTML = message + '<span class="dots"></span>';
    }

    // تکمیل لودینگ
    complete() {
        this.updateMessage('اتمام یافت! ✅');
        
        // نمایش پیام موفقیت
        setTimeout(() => {
            this.updateMessage('به سایت خوش آمدید! 🎉');
        }, 800);
        
        // مخفی کردن لودینگ
        setTimeout(() => {
            this.hide();
        }, 2000);
    }

    // تنظیم پیشرفت دستی
    setProgress(percent, message = null) {
        this.targetProgress = percent;
        this.currentProgress = percent;
        this.updateProgress(percent);
        
        if (message) {
            this.updateMessage(message);
        }
    }

    // نمایش خطا
    showError(message = 'خطا در بارگذاری! ❌') {
        this.updateMessage(message);
        this.progressBar.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
        
        setTimeout(() => {
            this.hide();
        }, 3000);
    }
}

// راه‌اندازی لودینگ
const loading = new LoadingManager();

// مثال‌های استفاده:

// نمایش لودینگ هنگام بارگذاری صفحه
window.addEventListener('load', () => {
    // loading.show();
});

// نمایش لودینگ برای درخواست AJAX
function showLoadingForRequest() {
    loading.show();
    
    // مثال درخواست
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            loading.complete();
        })
        .catch(error => {
            loading.showError('خطا در دریافت اطلاعات!');
        });
}

// نمایش لودینگ با پیشرفت دستی
function customProgress() {
    loading.show();
    
    setTimeout(() => loading.setProgress(25, 'آماده‌سازی'), 500);
    setTimeout(() => loading.setProgress(50, 'در حال پردازش'), 1000);
    setTimeout(() => loading.setProgress(75, 'تقریباً آماده'), 1500);
    setTimeout(() => loading.setProgress(100, 'تمام شد'), 2000);
    setTimeout(() => loading.complete(), 2500);
}

// تابع سریع برای نمایش لودینگ
function showLoading() {
    loading.show();
}

function hideLoading() {
    loading.hide();
}

// استفاده در فرم‌ها
document.addEventListener('DOMContentLoaded', function() {
    // مثال برای فرم‌ها
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            loading.show();
        });
    });
});

console.log('Loading Manager آماده است!');
console.log('برای استفاده: loading.show() یا loading.hide()');

/* 
نمونه کدهای استفاده:

// نمایش ساده
loading.show();

// مخفی کردن
loading.hide();

// نمایش با پیام سفارشی
loading.setProgress(50, 'در حال آپلود فایل...');

// نمایش خطا
loading.showError('اتصال به اینترنت قطع است!');
*/
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
