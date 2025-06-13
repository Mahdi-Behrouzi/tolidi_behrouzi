const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");

  const isOpen = sidebar.classList.contains("active");
  menuIcon.style.display = isOpen ? "none" : "inline";
  closeIcon.style.display = isOpen ? "inline" : "none";
});
(){
    <!-- Glider.js -->
<script src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"></script>
<script>
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    dots: '.dots',
    draggable: true,
    duration: 0.5,
    rewind: true,
    autoplay: true
  });

  // اسلاید خودکار
  let glider = document.querySelector('.glider');
  let index = 0;
  setInterval(() => {
    const total = glider.children.length;
    index = (index + 1) % total;
    document.querySelectorAll('.dots button')[index].click();
  }, 5000); // هر ۵ ثانیه
</script>

