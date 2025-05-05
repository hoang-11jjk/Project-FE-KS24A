let currentPage = 1;
const rowsPerPage = 10;
const tbodyEl = document.querySelector('tbody');
const paginationEl = document.querySelector('.pagination');

function renderTable(list = users) {
    if (!tbodyEl || !paginationEl) {
        console.error('Không tìm thấy phần tử DOM cần thiết.');
        return;
    }

    tbodyEl.innerHTML = '';
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = list.slice(start, end);

    paginatedUsers.forEach(user => {
        if (!user || !user.firstName || !user.lastName || !user.email) return;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName} ${user.lastName} <span>@${user.firstName.toLowerCase()}</span></td>
            <td>${user.status === 'active' ? 'hoạt động' : 'blocked'}</td>
            <td>${user.email}</td>
            <td class="actions"><a href="#">block</a> | <a href="#">unblock</a></td>
        `;
        tbodyEl.appendChild(row);
    });

    renderPagination(list.length);
}

function renderPagination(totalUsers) {
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
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

    const userCountEl = document.querySelector('.user-count');
    if (userCountEl) {
        userCountEl.textContent = `${totalUsers} users`;
    }
}

function changePage(page) {
    const totalPages = Math.ceil((typeof users !== 'undefined' ? users : JSON.parse(localStorage.getItem('users')) || []).length / rowsPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    renderTable();
}

document.querySelector('.search-container input')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const usersData = typeof users !== 'undefined' ? users : JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = usersData.filter(user =>
        user && user.firstName && user.lastName && user.email && (
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        )
    );
    currentPage = 1;
    renderTable(filteredUsers);
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

document.addEventListener('DOMContentLoaded', () => renderTable());