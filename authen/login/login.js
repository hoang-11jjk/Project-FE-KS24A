
import {users} from '../../main.js';

document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        if (user.role === 'ADMIN') {
            alert('Đăng nhập thành công với quyền ADMIN!');
            window.location.href = '/adminPage/admin.html'; 
        } else {
            alert('Đăng nhập thành công!');
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../../home-page/index.html';
        }
            
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
});
