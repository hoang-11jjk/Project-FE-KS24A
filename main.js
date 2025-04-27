let users = [
    {
        email: "admin@gmail.com",
        password: "123",
        role: "ADMIN",
    }
];

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem('users'));
}

function updateData() {
    localStorage.setItem('users', JSON.stringify(users));
}

let entries = [];

let articles = [
    {
        title: "Sample Article",
        content: "This is a sample article content. It was created to test the functionality of displaying articles on the page.",
        image: "../PNJ/Image (1).png",
        category: "Daily Journal",
        categoryColor: "daily-journal",
        mood: "Happy",
        status: "public",
        date: "4/28/2025",
        entries: 0
    },
    {
        title: "My Weekend Adventure",
        content: "I spent my weekend hiking in the mountains with friends. The fresh air and stunning views were exactly what I needed to recharge.",
        image: "../PNJ/Image (2).png",
        category: "Daily Journal",
        categoryColor: "daily-journal",
        mood: "Excited",
        status: "public",
        date: "4/27/2025",
        entries: 0
    },
    {
        title: "Navigating a Tough Project",
        content: "This week, I faced a challenging project at work. It required a lot of late nights, but I learned so much about teamwork and problem-solving.",
        image: "../PNJ/Image (3).png",
        category: "Work & Career",
        categoryColor: "work--career",
        mood: "Sad",
        status: "private",
        date: "4/26/2025",
        entries: 0
    },
    {
        title: "Why I Love Coding",
        content: "Coding has become my passion. Solving problems and building something from scratch gives me a sense of accomplishment like nothing else.",
        image: "../PNJ/Image (4).png",
        category: "Personal Thoughts",
        categoryColor: "personal-thoughts",
        mood: "Happy",
        status: "public",
        date: "4/25/2025",
        entries: 0
    },
    {
        title: "Dealing with Stress",
        content: "Lately, I've been feeling overwhelmed. I’m trying to manage stress with meditation and journaling, but it’s been a tough journey.",
        image: "../PNJ/Image (5).png",
        category: "Emotions & Feelings",
        categoryColor: "emotions--feelings",
        mood: "Sad",
        status: "private",
        date: "4/24/2025",
        entries: 0
    },
    {
        title: "A Day at the Beach",
        content: "I had an amazing day at the beach today! The waves were perfect for surfing, and I enjoyed a beautiful sunset with my family.",
        image: "../PNJ/Image (6).png",
        category: "Daily Journal",
        categoryColor: "daily-journal",
        mood: "Excited",
        status: "public",
        date: "4/23/2025",
        entries: 0
    },
    {
        title: "Career Goals for 2025",
        content: "I’ve set some ambitious career goals for this year, including learning new skills and aiming for a promotion at work.",
        image: "../PNJ/Image (7).png",
        category: "Work & Career",
        categoryColor: "work--career",
        mood: "Happy",
        status: "public",
        date: "4/22/2025",
        entries: 0
    },
    {
        title: "Reflections on Friendship",
        content: "I’ve been thinking a lot about my friendships lately. I’m grateful for the people who support me through thick and thin.",
        image: "../PNJ/Image (8).png",
        category: "Personal Thoughts",
        categoryColor: "personal-thoughts",
        mood: "Happy",
        status: "private",
        date: "4/21/2025",
        entries: 0
    },
    {
        title: "Feeling Anxious Today",
        content: "I woke up feeling anxious for no apparent reason. I’m trying to focus on breathing exercises to calm myself down.",
        image: "../PNJ/Image (9).png",
        category: "Emotions & Feelings",
        categoryColor: "emotions--feelings",
        mood: "Sad",
        status: "private",
        date: "4/20/2025",
        entries: 0
    },
    {
        title: "My First Marathon",
        content: "I ran my first marathon today! It was exhausting but incredibly rewarding to cross the finish line after months of training.",
        image: "../PNJ/Image (10).png",
        category: "Daily Journal",
        categoryColor: "daily-journal",
        mood: "Excited",
        status: "public",
        date: "4/19/2025",
        entries: 0
    },
    {
        title: "Lessons from Failure",
        content: "I recently failed at a project I was excited about. It was disappointing, but I learned valuable lessons about resilience.",
        image: "../PNJ/Image (11).png",
        category: "Personal Thoughts",
        categoryColor: "personal-thoughts",
        mood: "Sad",
        status: "private",
        date: "4/18/2025",
        entries: 0
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