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

const form = document.getElementById("commentForm");
const commentList = document.getElementById("commentsList");
const successMsg = document.getElementById("commentSuccess");

// مشخصات JSONBin
const BIN_ID = "68867c9cf7e7a370d1eed4fc";
const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";

// اعتبارسنجی شماره و ایمیل
function isValidContact(input) {
  const phoneRegex = /^09\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return phoneRegex.test(input) || emailRegex.test(input);
}

// ارسال نظر
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!isValidContact(contact)) {
    alert("ایمیل یا شماره تلفن معتبر وارد کنید.");
    return;
  }

  const newComment = {
    name,
    contact,
    message,
    ip: await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip),
    time: new Date().toLocaleString("fa-IR")
  };

  // گرفتن لیست فعلی و اضافه کردن نظر جدید
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  const data = await res.json();
  const comments = data.record || [];

  comments.push(newComment);

  // ذخیره مجدد
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(comments)
  });

  successMsg.style.display = "block";
  form.reset();
  showComments();
});

// نمایش نظرات
async function showComments() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  const data = await res.json();
  const comments = data.record || [];

  commentList.innerHTML = "";

  comments.reverse().forEach(comment => {
    commentList.innerHTML += `
      <div class="comment-item">
        <strong>${comment.name}</strong> (${comment.contact})<br>
        <small>${comment.time} - IP: ${comment.ip}</small>
        <p>${comment.message}</p>
      </div>
    `;
  });
}

showComments();
