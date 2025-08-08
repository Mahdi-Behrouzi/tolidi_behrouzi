// گالری محصولات
class ProductGallery {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.currentSort = 'name';
        this.searchTerm = '';
        this.productsPerPage = 6;
        this.currentPage = 1;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.setupModal();
    }

    // بارگذاری محصولات (در حالت واقعی از API دریافت می‌شود)
    loadProducts() {
        // نمونه داده‌های محصولات
        this.products = [
            {
                id: 1,
                name: 'مبل راحتی مدرن',
                description: 'مبل راحتی با طراحی مدرن و راحت برای استفاده روزانه',
                price: 25000000,
                oldPrice: 30000000,
                image: 'img/products/product1.jpg',
                category: 'furniture',
                rating: 4,
                reviewCount: 24,
                badge: 'new',
                featured: false
            },
            {
                id: 2,
                name: 'گلدان تزئینی سرامیکی',
                description: 'گلدان زیبا برای تزئین منزل با جنس سرامیک درجه یک',
                price: 1500000,
                oldPrice: null,
                image: 'img/products/product2.jpg',
                category: 'decoration',
                rating: 5,
                reviewCount: 18,
                badge: 'sale',
                featured: false
            },
            {
                id: 3,
                name: 'چراغ آویز مدرن',
                description: 'چراغ آویز با طراحی منحصر به فرد برای روشنایی مدرن',
                price: 3500000,
                oldPrice: null,
                image: 'img/products/product3.jpg',
                category: 'lighting',
                rating: 4,
                reviewCount: 31,
                badge: 'popular',
                featured: true
            },
            {
                id: 4,
                name: 'ساعت دیواری چوبی',
                description: 'ساعت دیواری با جنس چوب طبیعی و طراحی کلاسیک',
                price: 850000,
                oldPrice: null,
                image: 'img/products/product4.jpg',
                category: 'accessories',
                rating: 3,
                reviewCount: 12,
                badge: null,
                featured: false
            },
            {
                id: 5,
                name: 'میز ناهارخوری کلاسیک',
                description: 'میز غذاخوری 6 نفره با کیفیت بالا و طراحی کلاسیک',
                price: 18000000,
                oldPrice: 22000000,
                image: 'img/products/product5.jpg',
                category: 'furniture',
                rating: 5,
                reviewCount: 42,
                badge: 'featured',
                featured: true
            },
            {
                id: 6,
                name: 'تابلو نقاشی مدرن',
                description: 'تابلو هنری برای تزئین دیوار با طراحی مدرن و زیبا',
                price: 2200000,
                oldPrice: null,
                image: 'img/products/product6.jpg',
                category: 'decoration',
                rating: 4,
                reviewCount: 15,
                badge: null,
                featured: false
            }
        ];

        this.filteredProducts = [...this.products];
        this.renderProducts();
    }
// تنظیم Event Listeners
    setupEventListeners() {
        // فیلتر دسته‌بندی
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // تغییر نمایش
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setView(e.target.dataset.view);
            });
        });

        // جستجو
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.applyFilters();
            }, 300);
        });

        // مرتب‌سازی
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // بارگذاری بیشتر
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMore();
        });

        // نمایش سریع محصولات
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-view')) {
                const productId = parseInt(e.target.closest('.quick-view').dataset.product);
                this.showQuickView(productId);
            }
        });

        // اضافه به سبد خرید
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                this.addToCart(productName);
            }
        });
    }

    // تنظیم فیلتر
    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;

        // آپدیت دکمه‌های فیلتر
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.applyFilters();
    }

    // تنظیم نمایش
    setView(view) {
        this.currentView = view;

        // آپدیت دکمه‌های نمایش
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // تغییر کلاس grid
        const grid = document.getElementById('productsGrid');
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }
// اعمال فیلترها
    applyFilters() {
        let filtered = [...this.products];

        // فیلتر دسته‌بندی
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentFilter);
        }

        // فیلتر جستجو
        if (this.searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.searchTerm) ||
                product.description.toLowerCase().includes(this.searchTerm)
            );
        }

        // مرتب‌سازی
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'price':
                    return a.price - b.price;
                case 'date':
                    return b.id - a.id; // جدیدترین اول
                case 'popular':
                    return b.reviewCount - a.reviewCount;
                default:
                    return a.name.localeCompare(b.name, 'fa');
            }
        });

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    // رندر محصولات
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                    </svg>
                    <h3>محصولی یافت نشد</h3>
                    <p>با فیلترهای مختلف جستجو کنید</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');

        // نمایش/مخفی کردن دکمه بارگذاری بیشتر
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (endIndex >= this.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }

        // انیمیشن ورود کارت‌ها
        this.animateCards();
    }

    // ایجاد کارت محصول
    createProductCard(product) {
        const badge = product.badge ? `<span class="product-badge ${product.badge}">${this.getBadgeText(product.badge)}</span>` : '';
        const oldPrice = product.oldPrice ? `<span class="old-price">${this.formatPrice(product.oldPrice)} تومان</span>` : '';
        const stars = this.generateStars(product.rating);

        return `
            <div class="product-card" data-category="${product.category}" data-name="${product.name}" data-price="${product.price}">
                <div class="product-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; font-weight: 600;">
                        ${product.name}
                    </div>
                    <div class="product-overlay">
                        <button class="quick-view" data-product="${product.id}">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                            </svg>
                        </button>
                        <button class="add-to-cart">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,7H15.5L14.5,6C14.1,5.4 13.4,5 12.7,5H11.3C10.6,5 9.9,5.4 9.5,6L8.5,7H5A2,2 0 0,0 3,9V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9A2,2 0 0,0 19,7M12,17.5L6.5,12H10V10H14V12H17.5L12,17.5Z"/>
                            </svg>
                        </button>
                    </div>
                    ${badge}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-count">(${product.reviewCount} نظر)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${this.formatPrice(product.price)} تومان</span>
                        ${oldPrice}
                    </div>
                </div>
            </div>
        `;
    }
// تولید ستاره‌ها
    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
        }
        return stars;
    }

    // فرمت قیمت
    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // متن برچسب
    getBadgeText(badge) {
        const badges = {
            'new': 'جدید',
            'sale': 'تخفیف',
            'popular': 'محبوب',
            'featured': 'ویژه'
        };
        return badges[badge] || '';
    }

    // انیمیشن ورود کارت‌ها
    animateCards() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // بارگذاری بیشتر
    loadMore() {
        this.currentPage++;
        this.renderProducts();
        
        // اسکرول نرم به محصولات جدید
        setTimeout(() => {
            const newProducts = document.querySelectorAll('.product-card');
            const targetCard = newProducts[Math.min(this.currentPage * this.productsPerPage - this.productsPerPage, newProducts.length - 1)];
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 500);
    }

    // نمایش سریع محصول
    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('quickViewModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalStars = document.getElementById('modalStars');
        const modalRatingCount = document.getElementById('modalRatingCount');
        const modalPrice = document.getElementById('modalPrice');
        const modalOldPrice = document.getElementById('modalOldPrice');

        // تنظیم محتوای modal
        modalImage.style.cssText = `
            width: 100%; 
            height: 400px; 
            background: linear-gradient(135deg, #667eea, #764ba2); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-size: 18px; 
            font-weight: 600;
            border-radius: 15px;
        `;
        modalImage.textContent = product.name;
        
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalStars.innerHTML = this.generateStars(product.rating);
        modalRatingCount.textContent = `(${product.reviewCount} نظر)`;
        modalPrice.textContent = `${this.formatPrice(product.price)} تومان`;
        
        if (product.oldPrice) {
            modalOldPrice.textContent = `${this.formatPrice(product.oldPrice)} تومان`;
            modalOldPrice.style.display = 'inline';
        } else {
            modalOldPrice.style.display = 'none';
        }

        // نمایش modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // تنظیم modal
    setupModal() {
        const modal = document.getElementById('quickViewModal');
        const closeBtn = document.querySelector('.modal-close');

        // بستن modal
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // بستن با کلیک خارج از modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // بستن با کلید Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeModal();
            }
        });

        // دکمه‌های modal
        document.querySelector('.modal-cart-btn').addEventListener('click', () => {
            const productName = document.getElementById('modalTitle').textContent;
            this.addToCart(productName);
            this.closeModal();
        });

        document.querySelector('.modal-wishlist-btn').addEventListener('click', () => {
            const productName = document.getElementById('modalTitle').textContent;
            this.addToWishlist(productName);
        });
    }

    // بستن modal
    closeModal() {
        const modal = document.getElementById('quickViewModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // اضافه به سبد خرید
    addToCart(productName) {
        // نمایش نوتیفیکیشن
        this.showNotification(`${productName} به سبد خرید اضافه شد!`, 'success');
        
        // انیمیشن دکمه
        const button = event.target.closest('button');
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // اضافه به علاقه‌مندی‌ها
    addToWishlist(productName) {
        this.showNotification(`${productName} به علاقه‌مندی‌ها اضافه شد!`, 'info');
    }

    // نمایش نوتیفیکیشن
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            'success': '✅',
            'info': 'ℹ️',
            'warning': '⚠️',
            'error': '❌'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type]}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // استایل نوتیفیکیشن
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            backdrop-filter: blur(10px);
            max-width: 350px;
            ${type === 'success' ? 'background: linear-gradient(135deg, #27ae60, #2ecc71);' : ''}
            ${type === 'info' ? 'background: linear-gradient(135deg, #3498db, #2980b9);' : ''}
            ${type === 'warning' ? 'background: linear-gradient(135deg, #f39c12, #e67e22);' : ''}
            ${type === 'error' ? 'background: linear-gradient(135deg, #e74c3c, #c0392b);' : ''}
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        // انیمیشن ورود
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // حذف خودکار
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // جستجوی پیشرفته (اختیاری)
    advancedSearch(filters) {
        let filtered = [...this.products];
        
        // فیلتر قیمت
        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }
        
        // فیلتر امتیاز
        if (filters.minRating) {
            filtered = filtered.filter(p => p.rating >= filters.minRating);
        }
        
        // فقط محصولات ویژه
        if (filters.featuredOnly) {
            filtered = filtered.filter(p => p.featured);
        }
        
        this.filteredProducts = filtered;
        this.renderProducts();
    }

    // دریافت آمار
    getStats() {
        return {
            total: this.products.length,
            byCategory: this.products.reduce((acc, product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {}),
            averagePrice: this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length,
            averageRating: this.products.reduce((sum, p) => sum + p.rating, 0) / this.products.length
        };
    }
}
// راه‌اندازی گالری محصولات
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new ProductGallery();
    
    // در دسترس قرار دادن برای استفاده خارجی
    window.productGallery = gallery;
    
    // تنظیم منوی موبایل (اختیاری)
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('mobile-active');
        });
    }
    
    // اسکرول نرم برای لینک‌ها
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy Loading برای تصاویر
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // نمایش لودینگ هنگام بارگذاری تصاویر
    document.querySelectorAll('.product-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'img/placeholder.jpg'; // تصویر جایگزین
        });
    });
    
    console.log('گالری محصولات آماده شد! 🎉');
});