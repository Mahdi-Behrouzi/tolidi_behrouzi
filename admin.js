const correctPassword = "123456"; // رمز عبور مدیر را در صورت نیاز تغییر دهید

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  const error = document.getElementById("admin-error");
  if (pass === correctPassword) {
    document.querySelector(".admin-login").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    error.textContent = "";
    showComments();
  } else {
    error.textContent = "رمز عبور نادرست است!";
  }
}

document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  fetch("https://api.ipify.org/?format=json")
    .then(res => res.json())
    .then(data => {
      const ip = data.ip;

      const name = document.getElementById("commentName").value.trim();
      const email = document.getElementById("commentEmail").value.trim();
      const phone = document.getElementById("commentPhone").value.trim();
      const message = document.getElementById("commentMessage").value.trim();

      if (!validateEmail(email) || !validatePhone(phone)) {
        alert("ایمیل یا شماره تلفن نامعتبر است.");
        return;
      }

      const comment = { name, email, phone, message, ip };
      const comments = JSON.parse(localStorage.getItem("comments") || "[]");
      comments.push(comment);
      localStorage.setItem("comments", JSON.stringify(comments));

      this.reset();
      alert("نظر شما ثبت شد!");
    });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^09\d{9}$/.test(phone);
}

function showComments() {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const container = document.getElementById("adminCommentsList");
  container.innerHTML = "";

  if (comments.length === 0) {
    container.innerHTML = "<p>هیچ نظری ثبت نشده است.</p>";
    return;
  }

  comments.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "comment-box";
    div.innerHTML = `
      <strong>👤 نام: </strong>${c.name}<br/>
      <strong>📧 ایمیل: </strong>${c.email}<br/>
      <strong>📞 تلفن: </strong>${c.phone}<br/>
      <strong>🌐 آی‌پی: </strong>${c.ip || "نامشخص"}<br/>
      <strong>💬 نظر:</strong>
      <p>${c.message}</p>
      <button onclick="deleteComment(${index})">🗑 حذف</button>
    `;
    container.appendChild(div);
  });
}
