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