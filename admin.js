function loginAdmin() {
  const password = document.getElementById('adminPass').value;
  if (password === 'behrouzi123') {
    document.getElementById('adminComments').style.display = 'block';
    loadComments();
  } else {
    alert('رمز نادرست است!');
  }
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const list = document.getElementById('adminCommentsList');
  list.innerHTML = '';

  if (comments.length === 0) {
    list.innerHTML = '<p>نظری ثبت نشده است.</p>';
    return;
  }

  comments.forEach((comment, index) => {
    const div = document.createElement('div');
    div.className = 'comment-card';
    div.innerHTML = `
      <p><strong>📧 ${comment.email || 'بدون ایمیل'}:</strong></p>
      <p>${comment.text}</p>
      <button onclick="deleteComment(${index})">❌ حذف</button>
      <hr>
    `;
    list.appendChild(div);
  });
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  loadComments();
}
