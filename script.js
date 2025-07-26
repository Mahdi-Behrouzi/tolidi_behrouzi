<script>
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("main-nav");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("open");
  });
</script>



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

<script>
  const form = document.getElementById("commentForm");
  const commentSuccess = document.getElementById("commentSuccess");
  const commentsList = document.getElementById("commentsList");

  function validateInput(name, emailOrPhone, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    return name && message && (emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone));
  }

  function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function loadComments() {
    commentsList.innerHTML = "";
    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.forEach((comment, index) => {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `
        <strong>${comment.name} (${comment.email})</strong>
        <p>${comment.message}</p>
        <button class="delete-btn" onclick="deleteComment(${index})">حذف</button>
      `;
      commentsList.appendChild(div);
    });
  }

  function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!validateInput(name, email, message)) {
      alert("لطفاً نام، نظر، و ایمیل یا شماره تماس معتبر وارد کنید.");
      return;
    }

    const comment = { name, email, message };
    saveComment(comment);
    loadComments();
    commentSuccess.style.display = "block";
    form.reset();
    setTimeout(() => commentSuccess.style.display = "none", 3000);
  });

  // نمایش اولیه
  loadComments();
</script>


