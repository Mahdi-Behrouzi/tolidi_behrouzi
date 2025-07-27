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
      <strong>${c.name}</strong> (${c.email})<br/>
      <p>${c.message}</p>
      <button onclick="deleteComment(${index})">حذف</button>
    `;
    container.appendChild(div);
  });
}

function deleteComment(index) {
  let comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  showComments();
}
