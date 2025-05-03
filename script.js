// منو باز و بسته
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');

  // تغییر آیکون دکمه
  if (sidebar.classList.contains('active')) {
    menuToggle.innerHTML = '&times;'; // ضربدر
  } else {
    menuToggle.innerHTML = '&#9776;'; // سه خطی
  }
});

// شمارنده بازدید ساده
const countElement = document.getElementById('visitor-count');
let count = localStorage.getItem('visitCount') || 0;
count++;
localStorage.setItem('visitCount', count);
countElement.textContent = `بازدید امروز: ${count}`;
