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
    loading.show();
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
