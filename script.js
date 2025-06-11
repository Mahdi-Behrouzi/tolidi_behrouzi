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
