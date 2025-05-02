// باز و بسته کردن منو
const toggleButton = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// شمارنده بازدید
const visitCountElem = document.getElementById('visit-count');
let count = localStorage.getItem('visitCount');

if (count) {
  count = Number(count) + 1;
} else {
  count = 1;
}
localStorage.setItem('visitCount', count);
visitCountElem.textContent = `تعداد بازدید: ${count}`;
