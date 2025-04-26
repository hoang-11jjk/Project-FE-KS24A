let users = [
    {
        email: "admin@gmail.com",
        password: "123",
        role: "ADMIN",
    }
]

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem('users'));
}

function updateData(){
    localStorage.setItem('users', JSON.stringify(users));
}



let entries = [
    
];

let articles = [
    
];

// Khởi tạo dữ liệu nếu chưa có trong localStorage
if (!localStorage.getItem('entries')) {
    localStorage.setItem('entries', JSON.stringify(entries));
} else {
    entries = JSON.parse(localStorage.getItem('entries'));
}

if (!localStorage.getItem('articles')) {
    localStorage.setItem('articles', JSON.stringify(articles));
} else {
    articles = JSON.parse(localStorage.getItem('articles'));
}

function updateEntries() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

function updateArticles() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

export { users, updateData, entries, articles, updateEntries, updateArticles };