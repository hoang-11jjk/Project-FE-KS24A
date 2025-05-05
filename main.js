let users = [
    {
        firstName: "Admin",
        lastName: "User",
        email: "admin@gmail.com",
        password: "123",
        role: "ADMIN",
        status: "active"
    },
    {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "password456",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        password: "alicepass",
        role: "USER",
        status: "inactive"
    },
    {
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        password: "bobsecure",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Charlie",
        lastName: "Davis",
        email: "charlie.davis@example.com",
        password: "charlie123",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Emily",
        lastName: "Clark",
        email: "emily.clark@example.com",
        password: "emilypass",
        role: "USER",
        status: "inactive"
    },
    {
        firstName: "Frank",
        lastName: "Evans",
        email: "frank.evans@example.com",
        password: "franksecure",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Grace",
        lastName: "Harris",
        email: "grace.harris@example.com",
        password: "grace123",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Henry",
        lastName: "Martinez",
        email: "henry.martinez@example.com",
        password: "henrypass",
        role: "USER",
        status: "inactive"
    },
    {
        firstName: "Ivy",
        lastName: "Lopez",
        email: "ivy.lopez@example.com",
        password: "ivysecure",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Jack",
        lastName: "Wilson",
        email: "jack.wilson@example.com",
        password: "jack123",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Karen",
        lastName: "Moore",
        email: "karen.moore@example.com",
        password: "karenpass",
        role: "USER",
        status: "inactive"
    },
    {
        firstName: "Leo",
        lastName: "Taylor",
        email: "leo.taylor@example.com",
        password: "leosecure",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Mia",
        lastName: "Anderson",
        email: "mia.anderson@example.com",
        password: "mia123",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Nathan",
        lastName: "Thomas",
        email: "nathan.thomas@example.com",
        password: "nathanpass",
        role: "USER",
        status: "inactive"
    },
    {
        firstName: "Olivia",
        lastName: "Jackson",
        email: "olivia.jackson@example.com",
        password: "oliviasecure",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Paul",
        lastName: "White",
        email: "paul.white@example.com",
        password: "paul123",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Quinn",
        lastName: "Hernandez",
        email: "quinn.hernandez@example.com",
        password: "quinnpass",
        role: "USER",
        status: "inactive"
    },
    {
        firstName: "Rachel",
        lastName: "King",
        email: "rachel.king@example.com",
        password: "rachelsecure",
        role: "USER",
        status: "active"
    },
    {
        firstName: "Steve",
        lastName: "Wright",
        email: "steve.wright@example.com",
        password: "steve123",
        role: "USER",
        status: "active"
    }
];


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

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem('users'));
}



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

function updateData() {
    localStorage.setItem('users', JSON.stringify(users));
}

function updateEntries() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

function updateArticles() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Hàm chuyển đổi ảnh từ URL sang Base64
async function convertImageToBase64(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting image:', error);
        return null;
    }
}

// Chuyển đổi tất cả hình ảnh cũ sang Base64
async function convertAllImagesToBase64() {
    for (let article of articles) {
        if (article.image && article.image.startsWith('../PNJ/')) {
            const base64Image = await convertImageToBase64(article.image);
            if (base64Image) {
                article.image = base64Image;
            }
        }
    }
    updateArticles();
}

// Gọi hàm chuyển đổi khi khởi động
convertAllImagesToBase64();