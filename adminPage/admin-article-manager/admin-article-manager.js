let articlesEl = document.getElementsByTagName("tbody")[0];
const paginationEl = document.querySelector('.pagination');

let articlesData = JSON.parse(localStorage.getItem('articles')) || [];

const articlesPerPage = 3;
let currentPage = 1;

const changeStatus = (id, value) => {
    articlesData[id].status = value;
    localStorage.setItem('articles', JSON.stringify(articlesData));
    renderArticles();
}

function renderArticles(list = articlesData) {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = list.slice(startIndex, endIndex);

    let data = paginatedArticles.reduce((temp, article, index) => {
        const globalIndex = articlesData.findIndex(a => a.title === article.title && a.content === article.content);
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
                        <option ${article.status === "Public" ? "selected" : ""} value="Public">Public</option>
                        <option ${article.status === "Private" ? "selected" : ""} value="Private">Private</option>
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
    const totalPages = Math.ceil(articlesData.length / articlesPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    renderArticles();
}

function deleteArticle(index) {
    articlesData.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articlesData));
    currentPage = 1;
    renderArticles();
}

function editArticle(index) {
    console.log("Edit article:", articlesData[index]);
}

renderArticles();
