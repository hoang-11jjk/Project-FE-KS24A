const backBtn = document.querySelector('.back-btn');

// Lấy dữ liệu bài viết từ localStorage
const article = JSON.parse(localStorage.getItem('currentArticle'));

// Hiển thị title và content lên giao diện
if (article) {
    const titleEl = document.querySelector('.article-details-title');
    const contentEl = document.querySelector('.article-details-text');

    if (titleEl && contentEl) {
        titleEl.textContent = article.title;
        contentEl.textContent = article.content;
    } else {
        console.error('Không tìm thấy phần tử để hiển thị title hoặc content. Kiểm tra file article-details.html xem phần article-details-header có bị comment không.');
    }
} else {
    console.error('Không tìm thấy dữ liệu bài viết trong localStorage. Đảm bảo bạn đã nhấn vào bài viết từ #articleGrid trên trang chính, và mảng articles không rỗng.');
}

// Xử lý nút back
if (backBtn) {
    backBtn.addEventListener('click', function() {
        window.location.href = '/home-page/index.html';
    });
}

// Khởi tạo mảng comments trong localStorage nếu chưa có
if (!localStorage.getItem('comments')) {
    localStorage.setItem('comments', JSON.stringify({}));
}

const commentForm = document.querySelector('.comment-form');
const commentInput = document.querySelector('.comment-input');
const commentSubmit = document.querySelector('.comment-submit');
const commentsList = document.querySelector('.comments-list');
const commentCount = document.querySelector('.comment-count');
const viewAllComments = document.querySelector('.view-all-comments');

// Hàm lấy comments cho bài viết hiện tại
function getArticleComments() {
    const comments = JSON.parse(localStorage.getItem('comments'));
    return comments[article.id] || [];
}

// Hàm lưu comments
function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('comments'));
    if (!comments[article.id]) {
        comments[article.id] = [];
    }
    comments[article.id].push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Hàm xóa comment
function deleteComment(commentId) {
    const comments = JSON.parse(localStorage.getItem('comments'));
    comments[article.id] = comments[article.id].filter(c => c.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(comments));
    renderComments();
}

// Hàm render comments
function renderComments() {
    const comments = getArticleComments();
    commentCount.textContent = `(${comments.length})`;
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item" data-id="${comment.id}">
            <img src="../PNJ/avt.jpg" alt="Avatar" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-text">${comment.text}</div>
                <div class="comment-actions">
                    <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
                    <span class="comment-delete">Delete</span>
                </div>
            </div>
        </div>
    `).join('');

    // Thêm event listener cho các nút delete
    document.querySelectorAll('.comment-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const commentId = e.target.closest('.comment-item').dataset.id;
            if (confirm('Are you sure you want to delete this comment?')) {
                deleteComment(commentId);
            }
        });
    });
}

// Xử lý submit comment
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (text) {
        const newComment = {
            id: Date.now().toString(),
            text: text,
            date: new Date().toISOString(),
            userId: 'current-user' // Có thể thay đổi theo user đang đăng nhập
        };
        
        saveComment(newComment);
        commentInput.value = '';
        renderComments();
    }
});

// Submit khi nhấn nút Comment
commentSubmit.addEventListener('click', () => {
    const event = new Event('submit');
    commentForm.dispatchEvent(event);
});

// Toggle hiện/ẩn comments
viewAllComments.addEventListener('click', () => {
    const arrow = viewAllComments.querySelector('.arrow');
    const isHidden = commentsList.style.display === 'none';
    
    commentsList.style.display = isHidden ? 'flex' : 'none';
    arrow.textContent = isHidden ? '▼' : '▶';
});

// Render comments ban đầu
renderComments();