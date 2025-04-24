document.addEventListener('DOMContentLoaded', function() {
    const avatarBtn = document.getElementById('avatarBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    document.addEventListener('click', function(e) {
        if (avatarBtn.contains(e.target)) {
            dropdownMenu.classList.toggle('active');
        } else if (!dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Add New Article Modal logic
    const addArticleBtn = document.querySelector('.main-add-article');
    const addArticleModal = document.getElementById('addArticleModal');
    const closeAddArticle = document.getElementById('closeAddArticle');

    if (addArticleBtn && addArticleModal && closeAddArticle) {
        addArticleBtn.addEventListener('click', function() {
            addArticleModal.style.display = 'flex';
        });
        closeAddArticle.addEventListener('click', function() {
            addArticleModal.style.display = 'none';
        });
        // Hide modal when clicking backdrop
        addArticleModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-article-backdrop')) {
                addArticleModal.style.display = 'none';
            }
        });
    }

    // Thêm chức năng thêm bài viết
    const addBtn = document.querySelector('.add-article-submit-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            // Lấy dữ liệu từ form
            const title = document.getElementById('articleTitle').value.trim();
            const categories = document.getElementById('articleCategories').value.trim();
            const mood = document.querySelector('.add-article-form-group input[type="text"].add-article-input-bg:not(#articleCategories)')?.value.trim() || '';
            const content = document.getElementById('articleContent').value.trim();
            const status = document.getElementById('statusPublic').checked ? 'public' : 'private';
            // Validate đơn giản
            if (!title || !categories || !content) {
                alert('Vui lòng nhập đầy đủ thông tin!');
                return;
            }
            // Tạo ngày hiện tại
            const today = new Date();
            const dateStr = today.toISOString().slice(0,10);
            // Chọn màu badge theo category
            let badgeClass = '';
            if (/work|career/i.test(categories)) badgeClass = 'main-category-blue';
            else if (/personal/i.test(categories)) badgeClass = 'main-category-green';
            else if (/emotion|feeling/i.test(categories)) badgeClass = 'main-category-purple';
            // Tạo thẻ bài viết mới
            const card = document.createElement('div');
            card.className = 'main-blog-card';
            card.innerHTML = `
                <img src="../PNJ/Image (1).png" alt="Blog" class="main-blog-card-img">
                <div class="main-blog-card-content">
                    <div class="main-blog-card-date">Date: ${dateStr}</div>
                    <div class="main-blog-card-title">${title}</div>
                    <div class="main-blog-card-desc">${content}</div>
                    <div class="main-blog-card-category">
                        <span class="main-category-badge ${badgeClass}">${categories}</span>
                    </div>
                </div>
            `;
            // Thêm vào đầu lưới bài viết
            const grid = document.querySelector('.main-blog-grid');
            if (grid) {
                grid.prepend(card);
            }
            // Đóng modal và reset form
            addArticleModal.style.display = 'none';
            document.getElementById('articleTitle').value = '';
            document.getElementById('articleCategories').value = '';
            if (document.querySelector('.add-article-form-group input[type="text"].add-article-input-bg:not(#articleCategories)'))
                document.querySelector('.add-article-form-group input[type="text"].add-article-input-bg:not(#articleCategories)').value = '';
            document.getElementById('articleContent').value = '';
            document.getElementById('statusPublic').checked = true;
            document.getElementById('statusPrivate').checked = false;
        });
    }
});