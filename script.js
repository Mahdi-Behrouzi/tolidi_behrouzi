const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mainNav.classList.toggle('open');
});


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

document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');
  const commentSuccess = document.getElementById('commentSuccess');
  const adminPassInput = document.getElementById('adminPass');
  const adminComments = document.getElementById('adminComments');
  const adminCommentsList = document.getElementById('adminCommentsList');

  let isAdmin = false;

  // ثبت نظر جدید
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const comment = {
      id: Date.now(),
      name,
      email,
      message
    };

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    commentForm.reset();
    commentSuccess.style.display = 'block';
    setTimeout(() => commentSuccess.style.display = 'none', 2000);

    renderComments();
    if (isAdmin) renderAdminComments();
  });

  // ورود مدیر
  window.loginAdmin = function() {
    const pass = adminPassInput.value.trim();
    if (pass === "1234") {
      isAdmin = true;
      adminComments.style.display = "block";
      renderAdminComments();
    } else {
      alert("❌ رمز عبور نادرست است");
    }
  }

  // نمایش نظرات کاربران
  function renderComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentsList.innerHTML = '';
    comments.forEach(c => {
      const div = document.createElement('div');
      div.className = "comment-box";
      div.innerHTML = `<strong>${c.name}</strong> (${c.email})<p>${c.message}</p>`;
      commentsList.appendChild(div);
    });
  }

  // نمایش نظرات برای مدیر با قابلیت حذف
  function renderAdminComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    adminCommentsList.innerHTML = '';
    comments.forEach(c => {
      const div = document.createElement('div');
      div.className = "comment-box";
      div.innerHTML = `<strong>${c.name}</strong> (${c.email})<p>${c.message}</p>`;
      const btn = document.createElement('button');
      btn.textContent = 'حذف';
      btn.onclick = () => {
        const newComments = comments.filter(x => x.id !== c.id);
        localStorage.setItem('comments', JSON.stringify(newComments));
        renderComments();
        renderAdminComments();
      };
      div.appendChild(btn);
      adminCommentsList.appendChild(div);
    });
  }

  renderComments(); // بارگذاری اولیه
});
