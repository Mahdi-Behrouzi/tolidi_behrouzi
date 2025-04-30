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

// نرم ظاهر شدن صفحه بعد از لود
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
