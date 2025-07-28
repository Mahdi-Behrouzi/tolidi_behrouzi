const BIN_URL = "https://api.jsonbin.io/v3/b/68867c9cf7e7a370d1eed4fc";
const API_KEY = "$2a$10$BAz3UXrj2Hs4CTSu9Sx.SORA0uPP1H62lvU/gZsySq7/iEzRRnAVe";

function loginAdmin() {
  const password = document.getElementById("adminPass").value;
  if (password !== "admin123") return alert("رمز اشتباه است!");

  document.getElementById("adminComments").style.display = "block";
  loadAdminComments();
}

function loadAdminComments() {
  fetch(BIN_URL + "/latest", {
    headers: { "X-Master-Key": API_KEY },
  })
    .then(res => res.json())
    .then(data => {
      const comments = data.record || [];
      const list = document.getElementById("adminCommentsList");
      list.innerHTML = "";

      comments.reverse().forEach(comment => {
        const card = document.createElement("div");
        card.className = "comment-card";
        card.innerHTML = `
          <p><strong>🧑‍💼 نام:</strong> ${comment.name}</p>
          <p><strong>📞 تماس:</strong> ${comment.contact}</p>
          <p><strong>💬 نظر:</strong> ${comment.message}</p>
          <p><strong>⏰ زمان:</strong> ${comment.time}</p>
        `;
        list.appendChild(card);
      });
    });
}
