document.addEventListener('DOMContentLoaded', function() {
    const categoryInput = document.querySelector('.category-input');
    const addButton = document.querySelector('.add-category-btn');
    const categoryTableBody = document.querySelector('.category-table tbody');
    let categories = [];
    let nextId = 1;
    let editingId = null;

    // Add/Edit category function
    function addCategory() {
        const categoryName = categoryInput.value.trim();
        if (categoryName) {
            if (editingId) {
                // Update existing category
                const index = categories.findIndex(c => c.id === editingId);
                if (index !== -1) {
                    categories[index].name = categoryName;
                    editingId = null;
                    addButton.textContent = 'Add Category';
                }
            } else {
                // Add new category
                const category = {
                    id: nextId++,
                    name: categoryName
                };
                categories.push(category);
            }
            renderCategories();
            categoryInput.value = '';
        }
    }

    // Edit category function
    window.editCategory = function(id) {
        const category = categories.find(c => c.id === id);
        if (category) {
            categoryInput.value = category.name;
            editingId = id;
            addButton.textContent = 'Update Category';
            categoryInput.focus();
        }
    };

    // Delete category function
    window.deleteCategory = function(id) {
        if (confirm('Are you sure you want to delete this category?')) {
            categories = categories.filter(c => c.id !== id);
            renderCategories();
            if (editingId === id) {
                editingId = null;
                categoryInput.value = '';
                addButton.textContent = 'Add Category';
            }
        }
    };

    // Render categories in table
    function renderCategories() {
        categoryTableBody.innerHTML = '';
        categories.forEach(category => {
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

    // Event listeners
    addButton.addEventListener('click', addCategory);
    categoryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCategory();
        }
    });

    // Example categories for demonstration
    categories.push(
        { id: nextId++, name: 'Technology' },
        { id: nextId++, name: 'Business' },
        { id: nextId++, name: 'Health' }
    );
    renderCategories();
});