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
    {
        id: 1,
        name: "Nhật ký học tập"
    },
    {
        id: 2,
        name: "Nhật ký mục tiêu và kế hoạch"
    },
    {
        id: 3,
        name: "Nhật ký trải nghiệm- học qua đời sống"
    }
];

let articles = [
    {
        id: 1,
        title: "Deadline đầu tiên của kỳ học",
        entries: "Nhật ký học tập",
        content: "Hôm nay mình vừa nộp xong bài tập lớn. Mệt nhưng thấy rất nhẹ nhõm!",
        mood: "Căng thẳng",
        status: "Riêng tư",
        image: "image1.jpg",
        date: "2025-02-23"
    },
    {
        id: 2,
        title: "Cà phê chiều chủ nhật",
        entries: "Nhật ký trải nghiệm- học qua đời sống",
        content: "Ngồi một mình trong quán quen, nghe nhạc lofi và viết vài dòng nhật ký...",
        mood: "Thư giãn",
        status: "Công khai",
        image: "image2.jpg",
        date: "2025-03-15"
    }
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