let articlesEl = document.getElementById("articleGrid");
const paginationEl = document.querySelector('.main-pagination');

// Phân trang
const articlesPerPage = 6; // Số bài viết mỗi trang
let currentPage = 1; // Trang hiện tại

// Thêm biến để lưu category đang được chọn
let currentCategory = 'all';

// Thêm biến để lưu từ khóa tìm kiếm
let searchKeyword = '';

// Thêm sự kiện cho input tìm kiếm
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Xử lý tìm kiếm khi nhấn nút
searchBtn.addEventListener('click', () => {
    searchKeyword = searchInput.value.trim().toLowerCase();
    currentPage = 1; // Reset về trang 1
    renderArticles(currentPage);
});

// Xử lý tìm kiếm khi nhấn Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchKeyword = searchInput.value.trim().toLowerCase();
        currentPage = 1; // Reset về trang 1
        renderArticles(currentPage);
    }
});

function renderArticles(page = 1) {
    // Lọc bài viết công khai
    let publicArticles = articles.filter(article => article.status === 'public');
    
    // Lọc theo category nếu không phải 'all'
    if (currentCategory !== 'all') {
        publicArticles = publicArticles.filter(article => 
            article.category === currentCategory
        );
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchKeyword) {
        publicArticles = publicArticles.filter(article => 
            article.title.toLowerCase().includes(searchKeyword) || 
            article.content.toLowerCase().includes(searchKeyword) ||
            article.category.toLowerCase().includes(searchKeyword)
        );
    }
    
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = publicArticles.slice(startIndex, endIndex);

    // Hiển thị thông báo không tìm thấy kết quả
    if (publicArticles.length === 0) {
        articlesEl.innerHTML = `
            <div class="no-results">
                <p>No articles found${searchKeyword ? ` for "${searchKeyword}"` : ''}</p>
            </div>
        `;
    } else {
        let data = paginatedArticles.map((article, index) => {
            // Tính chỉ số thực trong mảng articles gốc
            const globalIndex = articles.findIndex(a => a.title === article.title && a.content === article.content);
            return `
                <div class="main-blog-card" onclick="viewArticleDetails(${globalIndex})">
                    <img src="${article.image}" alt="${article.title}" class="main-blog-card-img">
                    <div class="main-blog-card-content">
                        <div class="main-blog-card-date">Date: ${article.date}</div>
                        <div class="main-blog-card-title">${article.title}</div>
                        <div class="main-blog-card-desc">${article.content}</div>
                        <div class="main-blog-card-category">
                            <span class="main-category-badge main-category-${article.categoryColor}">${article.category}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        articlesEl.innerHTML = data.join('');
    }

    // Cập nhật phân trang
    renderPagination(publicArticles.length);
}

function renderPagination(totalArticles) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    let paginationHTML = '';

    // Nút Previous
    paginationHTML += `
        <button class="main-pagination-btn main-pagination-prev" onclick="changePage(${currentPage - 1})">
            &lt; Previous
        </button>
    `;

    // Tính toán các trang để hiển thị
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Điều chỉnh startPage nếu endPage chạm giới hạn
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Thêm dấu "..." nếu cần
    if (startPage > 1) {
        paginationHTML += `
            <button class="main-pagination-btn" onclick="changePage(1)">1</button>
        `;
        if (startPage > 2) {
            paginationHTML += `<span class="main-pagination-ellipsis">...</span>`;
        }
    }

    // Hiển thị các nút trang
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="main-pagination-btn ${i === currentPage ? 'main-pagination-active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    // Thêm dấu "..." và nút cuối nếu cần
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="main-pagination-ellipsis">...</span>`;
        }
        paginationHTML += `
            <button class="main-pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>
        `;
    }

    // Nút Next
    paginationHTML += `
        <button class="main-pagination-btn main-pagination-next" onclick="changePage(${currentPage + 1})">
            Next &gt;
        </button>
    `;

    paginationEl.innerHTML = paginationHTML;

    // Vô hiệu hóa nút Previous/Next nếu ở trang đầu/cuối
    const prevBtn = document.querySelector('.main-pagination-prev');
    const nextBtn = document.querySelector('.main-pagination-next');
    if (currentPage === 1) {
        prevBtn.disabled = true;
        prevBtn.style.cursor = 'not-allowed';
        prevBtn.style.color = '#bdbdbd';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.cursor = 'pointer';
        prevBtn.style.color = '#6366f1';
    }
    if (currentPage === totalPages || totalPages === 0) {
        nextBtn.disabled = true;
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.style.color = '#bdbdbd';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.color = '#6366f1';
    }
}

function changePage(page) {
    const publicArticles = articles.filter(article => article.status === 'public');
    const totalPages = Math.ceil(publicArticles.length / articlesPerPage);

    // Đảm bảo trang hợp lệ
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    renderArticles(currentPage);
}

function viewArticleDetails(index) {
    const article = articles[index];
    localStorage.setItem('currentArticle', JSON.stringify(article));
    window.location.href = '/article-details/index.html';
}

// Hiển thị bài viết công khai ban đầu
renderArticles(currentPage);

// Xử lý nút mở modal thêm bài viết
const addArticleBtn = document.querySelector('.main-add-article');
const addArticleModal = document.getElementById('addArticleModal');
const closeAddArticle = document.getElementById('closeAddArticle');

if (addArticleBtn) {
    addArticleBtn.addEventListener('click', () => {
        addArticleModal.style.display = 'flex';
    });
}

// Xử lý form thêm bài viết
const addArticleForm = document.getElementById('addArticleForm');
if (addArticleForm) {
    addArticleForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Ngăn form tự động gửi đi

        // Lấy dữ liệu từ form
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value;
        const category = document.getElementById('category').value;
        const mood = document.querySelector('input[name="mood"]:checked').value;
        const status = document.querySelector('input[name="status"]:checked').value;

        // Kiểm tra các trường bắt buộc
        if (!title) {
            alert('Vui lòng nhập tiêu đề bài viết');
            return;
        }
        if (title.length > 100) {
            alert('Tiêu đề không được vượt quá 100 ký tự');
            return;
        }
        if (!content) {
            alert('Vui lòng nhập nội dung bài viết');
            return;
        }
        if (content.length > 5000) {
            alert('Nội dung không được vượt quá 5000 ký tự');
            return;
        }
        if (!image) {
            alert('Vui lòng chọn hình ảnh cho bài viết');
            return;
        }
        if (!category) {
            alert('Vui lòng chọn danh mục cho bài viết');
            return;
        }

        // Tạo đối tượng bài viết
        const newArticle = {
            title: title,
            content: content,
            image: image,
            category: category,
            categoryColor: category.toLowerCase().replace(/[& ]/g, '-'),
            mood: mood,
            status: status,
            date: new Date().toLocaleDateString(),
            entries: 0
        };

        // Lưu bài viết vào mảng articles và localStorage
        articles.unshift(newArticle);
        updateArticles(); // Lưu vào localStorage
        alert('Thêm bài viết thành công!');

        // Cập nhật giao diện với các bài viết công khai
        currentPage = 1; // Quay về trang 1 sau khi thêm bài viết
        renderArticles(currentPage);

        // Đóng modal và reset form
        addArticleModal.style.display = 'none';
        addArticleForm.reset();

        // Reset các giá trị mặc định
        document.querySelector('input[name="mood"][value="Happy"]').checked = true;
        document.querySelector('input[name="status"][value="public"]').checked = true;
        document.getElementById('category').value = '';
    });
}

// Xử lý nút đóng modal
if (closeAddArticle) {
    closeAddArticle.addEventListener('click', () => {
        addArticleModal.style.display = 'none';
        addArticleForm.reset();
        document.querySelector('input[name="mood"][value="Happy"]').checked = true;
        document.querySelector('input[name="status"][value="public"]').checked = true;
        document.getElementById('category').value = '';
    });
}

// Xử lý click ngoài modal để đóng
window.addEventListener('click', (e) => {
    if (e.target === addArticleModal) {
        addArticleModal.style.display = 'none';
        addArticleForm.reset();
        document.querySelector('input[name="mood"][value="Happy"]').checked = true;
        document.querySelector('input[name="status"][value="public"]').checked = true;
        document.getElementById('category').value = '';
    }
});

// Xử lý upload hình ảnh
const imageInput = document.getElementById('image');
const uploadLabel = document.querySelector('.upload-label');

uploadLabel.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Chuyển đổi file thành Base64
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64String = e.target.result;
                imageInput.value = base64String;
                uploadLabel.style.borderColor = '#22c55e';
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
});

// Xử lý dropdown menu
const avatarBtn = document.getElementById('avatarBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (avatarBtn && dropdownMenu) {
    document.addEventListener('click', function(e) {
        if (avatarBtn.contains(e.target)) {
            dropdownMenu.classList.toggle('active');
        } else if (!dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
};

// Hàm lọc bài viết theo category
function filterByCategory(category) {
    currentCategory = category;
    currentPage = 1; // Reset về trang 1 khi chuyển category
    
    // Cập nhật giao diện các nút category
    const categorySpans = document.querySelectorAll('.main-categories span');
    categorySpans.forEach(span => {
        if (span.textContent.includes(category) || 
           (category === 'all' && span.textContent === 'All blog posts')) {
            span.className = 'main-category-selected';
        } else {
            span.className = 'main-category';
        }
    });

    renderArticles(currentPage);
}

// Thêm hàm reset tìm kiếm
function resetSearch() {
    searchInput.value = '';
    searchKeyword = '';
    currentPage = 1;
    renderArticles(currentPage);
}