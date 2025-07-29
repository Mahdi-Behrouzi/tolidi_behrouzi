const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";
const BIN_ID = "6888a52aae596e708fbd8f34";

function loginAdmin() {
  const pass = document.getElementById("adminPassword").value;
  if (pass === "1234") {
    document.querySelector(".admin-login").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    loadComments();
  } else {
    document.getElementById("loginError").textContent = "رمز نادرست است!";
  }
}

async function loadComments() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY,
    },
  });
  const data = await res.json();
  const comments = data.record.comments || [];
  const list = document.getElementById("commentList");
  list.innerHTML = "";

  comments.forEach((comment, i) => {
    const div = document.createElement("div");
    div.className = "comment-card";
    div.innerHTML = `
      <p><strong>👤 نام:</strong> ${comment.name}</p>
      <p><strong>📧 ایمیل/تلفن:</strong> ${comment.email}</p>
      <p><strong>💬 نظر:</strong> ${comment.message}</p>
      <p><strong>🌐 آی‌پی:</strong> ${comment.ip || 'نامشخص'}</p>
      <div class="actions">
        ${!comment.approved ? `<button onclick="approveComment(${i})">✅ تأیید</button>` : ""}
        <button onclick="deleteComment(${i})">🗑 حذف</button>
      </div>
    `;
    list.appendChild(div);
  });
}

async function approveComment(index) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  data.record.comments[index].approved = true;

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(data.record),
  });
  loadComments();
}

async function deleteComment(index) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  data.record.comments.splice(index, 1);

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(data.record),
  });
  loadComments();
}
