
import { users, updateData } from '../../main.js';

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.querySelector('input[name="first-name"]').value.trim();
    const lastName = document.querySelector('input[name="last-name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    // Kiểm tra password tối thiểu 6 ký tự
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    // Kiểm tra email đã tồn tại chưa
    if (users.some(u => u.email === email)) {
        alert('Email đã được đăng ký!');
        return;
    }

    // Lưu user mới vào localStorage
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: 'USER',
    }
    users.push(newUser);
    updateData();
    alert('Đăng ký thành công!');
    // Có thể chuyển hướng sang trang đăng nhập nếu muốn
    window.location.href = '../login/index.html';
});

