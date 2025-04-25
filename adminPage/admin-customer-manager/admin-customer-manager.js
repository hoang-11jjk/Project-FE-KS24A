// Sample user data
const users = [
    { name: 'Olivia Rhye', username: '@olivia', status: 'hoạt động', email: 'olivia@untitledui.com' },
    { name: 'Phoenix Baker', username: '@phoenix', status: 'hoạt động', email: 'phoenix@untitledui.com' },
    { name: 'Lana Steiner', username: '@lana', status: 'hoạt động', email: 'lana@untitledui.com' },
    { name: 'Demi Wilkinson', username: '@demi', status: 'hoạt động', email: 'demi@untitledui.com' },
    { name: 'Candice Wu', username: '@candice', status: 'hoạt động', email: 'candice@untitledui.com' },
    { name: 'Natali Craig', username: '@natali', status: 'hoạt động', email: 'natali@untitledui.com' },
    { name: 'Drew Cano', username: '@drew', status: 'hoạt động', email: 'drew@untitledui.com' },
    { name: 'Orlando Diggs', username: '@orlando', status: 'hoạt động', email: 'orlando@untitledui.com' },
    { name: 'Andi Lane', username: '@andi', status: 'hoạt động', email: 'andi@untitledui.com' },
    { name: 'Kate Morrison', username: '@kate', status: 'hoạt động', email: 'kate@untitledui.com' }
];

// Populate table with user data
function populateTable(users) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="width: 32px; height: 32px; background: #f0f0f0; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; color: #666;">${user.name.charAt(0)}</span>
                    <div>
                        <div>${user.name}</div>
                        <div style="color: #666; font-size: 14px;">${user.username}</div>
                    </div>
                </div>
            </td>
            <td class="status">${user.status}</td>
            <td>${user.email}</td>
            <td>
                <button class="block-btn">block</button>
                <button class="unblock-btn">unblock</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Search functionality
const searchInput = document.querySelector('.search-container input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    populateTable(filteredUsers);
});

// Block/Unblock functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('block-btn') || e.target.classList.contains('unblock-btn')) {
        const row = e.target.closest('tr');
        const buttons = row.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.toggle('active'));
    }
});

// Initialize table
document.addEventListener('DOMContentLoaded', () => {
    populateTable(users);
});

// Sidebar menu item highlight
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});