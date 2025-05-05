let articlesEl = document.getElementsByTagName("tbody")[0];
const paginationEl = document.querySelector('.pagination');

const articlesPerPage = 3;
let currentPage = 1;

const changeStatus = (id, value) => {
    articles[id].status = value.toLowerCase(); // Chuẩn hóa trạng thái
    localStorage.setItem('articles', JSON.stringify(articles));
    renderArticles();
}

function renderArticles(list = articles) {
    if (!articlesEl || !paginationEl) {
        console.error('Không tìm thấy phần tử DOM cần thiết.');
        return;
    }

    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = list.slice(startIndex, endIndex);

    let data = paginatedArticles.reduce((temp, article, index) => {
        const globalIndex = articles.findIndex(a => a.title === article.title && a.content === article.content);
        return (
            temp +
            `<tr>
                <td>
                    <img src="${article.image}" class="thumb" alt="thumb">
                </td>
                <td>${article.title}</td>
                <td>${article.entries}</td>
                <td>${formatContent(article.content)}</td>
                <td>
                    <span class="status ${article.status.toLowerCase()}">${article.status}</span>
                </td>
                <td>
                    <select class="status-select" id="${globalIndex}" onchange="changeStatus(${globalIndex}, this.value)">
                        <option ${article.status.toLowerCase() === "public" ? "selected" : ""} value="public">Public</option>
                        <option ${article.status.toLowerCase() === "private" ? "selected" : ""} value="private">Private</option>
                    </select>
                </td>
                <td>
                    <button class="edit-btn" onclick="editArticle(${globalIndex})">Sửa</button>
                    <button class="delete-btn" onclick="deleteArticle(${globalIndex})">Xóa</button>
                </td>
            </tr>`
        );
    }, "");
    articlesEl.innerHTML = data;

    renderPagination(list.length);
}

function formatContent(content) {
    return content.length > 20 ? content.substring(0, 50) + '...' : content;
}

function renderPagination(totalArticles) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    let paginationHTML = '';

    paginationHTML += `
        <button class="prev-btn" onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i> Previous
        </button>
    `;

    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    let pageNumbersHTML = '';
    if (startPage > 1) {
        pageNumbersHTML += `
            <span class="page" onclick="changePage(1)">1</span>
        `;
        if (startPage > 2) {
            pageNumbersHTML += `<span class="page">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbersHTML += `
            <span class="page ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </span>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbersHTML += `<span class="page">...</span>`;
        }
        pageNumbersHTML += `
            <span class="page" onclick="changePage(${totalPages})">${totalPages}</span>
        `;
    }

    paginationHTML += `
        <div class="page-numbers">
            ${pageNumbersHTML}
        </div>
    `;

    paginationHTML += `
        <button class="next-btn" onclick="changePage(${currentPage + 1})">
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationEl.innerHTML = paginationHTML;

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (currentPage === 1) {
        prevBtn.disabled = true;
        prevBtn.style.cursor = 'not-allowed';
        prevBtn.style.color = '#bdbdbd';
        prevBtn.style.borderColor = '#ddd';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.cursor = 'pointer';
        prevBtn.style.color = '#666';
        prevBtn.style.borderColor = '#ddd';
    }
    if (currentPage === totalPages || totalPages === 0) {
        nextBtn.disabled = true;
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.style.color = '#bdbdbd';
        nextBtn.style.borderColor = '#ddd';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.color = '#666';
        nextBtn.style.borderColor = '#ddd';
    }
}

function changePage(page) {
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    renderArticles();
}

function deleteArticle(index) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
    if (confirmDelete) {
        articles.splice(index, 1);
        localStorage.setItem('articles', JSON.stringify(articles));
        currentPage = 1;
        renderArticles();
    }
}

function editArticle(index) {
    const article = articles[index];
    const editModal = document.getElementById('editArticleModal');
    if (!editModal) return;

    // Điền dữ liệu vào form
    document.getElementById('editIndex').value = index;
    document.getElementById('editTitle').value = article.title;
    document.getElementById('editCategory').value = article.category;
    document.getElementById('editContent').value = article.content;
    document.getElementById('editImage').value = article.image;
    document.querySelector(`input[name="mood"][value="${article.mood}"]`).checked = true;
    document.querySelector(`input[name="status"][value="${article.status.toLowerCase()}"]`).checked = true;

    // Hiển thị modal
    editModal.style.display = 'flex';
}

// Xử lý nút mở modal thêm bài viết
const addArticleBtn = document.querySelector('.add-btn');
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
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value;
        const category = document.getElementById('category').value;
        const mood = document.querySelector('input[name="mood"]:checked').value;
        const status = document.querySelector('input[name="status"]:checked').value;

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

        articles.unshift(newArticle);
        updateArticles();
        alert('Thêm bài viết thành công!');

        currentPage = 1;
        renderArticles();

        addArticleModal.style.display = 'none';
        addArticleForm.reset();
        document.querySelector('input[name="mood"][value="Happy"]').checked = true;
        document.querySelector('input[name="status"][value="public"]').checked = true;
        document.getElementById('category').value = '';
    });
}

// Xử lý nút đóng modal thêm
if (closeAddArticle) {
    closeAddArticle.addEventListener('click', () => {
        addArticleModal.style.display = 'none';
        addArticleForm.reset();
        document.querySelector('input[name="mood"][value="Happy"]').checked = true;
        document.querySelector('input[name="status"][value="public"]').checked = true;
        document.getElementById('category').value = '';
    });
}

// Xử lý form chỉnh sửa bài viết
const editArticleForm = document.getElementById('editArticleForm');
const editArticleModal = document.getElementById('editArticleModal');
const closeEditArticle = document.getElementById('closeEditArticle');

if (editArticleForm) {
    editArticleForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const index = parseInt(document.getElementById('editIndex').value);
        const title = document.getElementById('editTitle').value.trim();
        const content = document.getElementById('editContent').value.trim();
        const image = document.getElementById('editImage').value;
        const category = document.getElementById('editCategory').value;
        const mood = document.querySelector('input[name="mood"]:checked').value;
        const status = document.querySelector('input[name="status"]:checked').value;

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

        articles[index] = {
            title: title,
            content: content,
            image: image,
            category: category,
            categoryColor: category.toLowerCase().replace(/[& ]/g, '-'),
            mood: mood,
            status: status,
            date: articles[index].date, // Giữ nguyên ngày cũ
            entries: articles[index].entries
        };

        updateArticles();
        alert('Cập nhật bài viết thành công!');

        currentPage = 1;
        renderArticles();

        editArticleModal.style.display = 'none';
        editArticleForm.reset();
    });
}

// Xử lý nút đóng modal chỉnh sửa
if (closeEditArticle) {
    closeEditArticle.addEventListener('click', () => {
        editArticleModal.style.display = 'none';
        editArticleForm.reset();
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
    if (e.target === editArticleModal) {
        editArticleModal.style.display = 'none';
        editArticleForm.reset();
    }
});

// Xử lý upload hình ảnh cho modal thêm
const imageInput = document.getElementById('image');
const uploadLabel = document.querySelector('.upload-label');

uploadLabel.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Chỉ hỗ trợ định dạng JPEG hoặc PNG.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước tệp không được vượt quá 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                imageInput.value = e.target.result;
                uploadLabel.style.borderColor = '#22c55e';
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
});

// Xử lý upload hình ảnh cho modal chỉnh sửa
const editImageInput = document.getElementById('editImage');
const editUploadLabel = document.querySelector('#editArticleModal .upload-label');

editUploadLabel.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Chỉ hỗ trợ định dạng JPEG hoặc PNG.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước tệp không được vượt quá 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                editImageInput.value = e.target.result;
                editUploadLabel.style.borderColor = '#22c55e';
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
});

const userSl = document.getElementById('customer-manager');
if (userSl) {
    userSl.addEventListener('click', function() {
        window.location.href = '/adminPage/admin-customer-manager/index.html';
    });
}

const articleSl = document.getElementById('article-manager');
if (articleSl) {
    articleSl.addEventListener('click', function() {
        window.location.href = '/adminPage/admin-article-manager/index.html';
    });
}

const entriesSl = document.getElementById('entries-manager');
if (entriesSl) {
    entriesSl.addEventListener('click', function() {
        window.location.href = '/adminPage/admin-entries/index.html';
    });
}

const logoutSl = document.getElementById('log-out');
if (logoutSl) {
    logoutSl.addEventListener('click', function() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/authen/login/index.html';
        }
    });
}


renderArticles();