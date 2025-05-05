document.addEventListener('DOMContentLoaded', function() {
    const categoryInput = document.querySelector('.category-input');
    const addButton = document.querySelector('.add-category-btn');
    const categoryTableBody = document.querySelector('.category-table tbody');
    let editingId = null;

    function reorderIds() {
        entries.sort((a, b) => a.id - b.id);
        entries.forEach((entry, index) => {
            entry.id = index + 1;
        });
    }

    function addCategory() {
        const categoryName = categoryInput.value.trim();
        if (categoryName) {
            if (editingId) {
                const index = entries.findIndex(c => c.id === editingId);
                if (index !== -1) {
                    entries[index].name = categoryName;
                    editingId = null;
                    addButton.textContent = 'Add Category';
                }
            } else {
                const newEntry = {
                    id: entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1,
                    name: categoryName
                };
                entries.push(newEntry);
                reorderIds();
            }
            updateEntries();
            renderCategories();
            categoryInput.value = '';
        }
    }

    window.editCategory = function(id) {
        const category = entries.find(c => c.id === id);
        if (category) {
            categoryInput.value = category.name;
            editingId = id;
            addButton.textContent = 'Update Category';
            categoryInput.focus();
        }
    };

    window.deleteCategory = function(id) {
        if (confirm('Are you sure you want to delete this category?')) {
            const index = entries.findIndex(c => c.id === id);
            if (index !== -1) {
                entries.splice(index, 1);
                reorderIds();
                updateEntries();
                renderCategories();
                if (editingId === id) {
                    editingId = null;
                    categoryInput.value = '';
                    addButton.textContent = 'Add Category';
                }
            }
        }
    };

    function renderCategories() {
        categoryTableBody.innerHTML = '';
        entries.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>
                    <button class="edit-btn" onclick="editCategory(${category.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteCategory(${category.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            categoryTableBody.appendChild(row);
        });
    }

    addButton.addEventListener('click', addCategory);
    categoryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCategory();
        }
    });

    reorderIds();
    renderCategories();
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