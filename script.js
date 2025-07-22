const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
  if (sideMenu.classList.contains('open')) {
    sideMenu.classList.remove('open');
    menuBtn.innerHTML = '&#9776;'; // سه خط
    menuBtn.setAttribute('aria-label', 'بازکردن منو');
  } else {
    sideMenu.classList.add('open');
    menuBtn.innerHTML = '&times;'; // ضربدر
    menuBtn.setAttribute('aria-label', 'بستن منو');
  }
});

function closeMenu() {
  sideMenu.classList.remove('open');
  menuBtn.innerHTML = '&#9776;';
  menuBtn.setAttribute('aria-label', 'بازکردن منو');
}
<script>
