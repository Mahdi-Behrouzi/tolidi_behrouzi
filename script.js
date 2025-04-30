const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
  sidebar.classList.toggle('active');
});
// منو کشویی
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
  sidebar.classList.toggle('active');
});

// اضافه‌شده: وقتی صفحه لود شد، افکت نمایش بده
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
