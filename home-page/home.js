let articlesEl = document.getElementById("articleGrid");


let articlesData = JSON.parse(localStorage.getItem('articles')) || [];

function renderArticles(list = articlesData) {
    let data = list.map((article) => {
        return `
            <div class="main-blog-card">
                <img src="${article.image}" alt="${article.title}" class="main-blog-card-img">
                <div class="main-blog-card-content">
                    <div class="main-blog-card-date">Date: ${article.date}</div>
                    <div class="main-blog-card-title">${article.title}</div>
                    <div class="main-blog-card-desc">${article.content}</div>
                    <div class="main-blog-card-category">
                        <span class="main-category-badge main-category-${article.categoryColor}">${article.category}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    articlesEl.innerHTML = data.join('');
}


renderArticles();


const addArticleBtn = document.querySelector('.main-add-article');
const addArticleModal = document.getElementById('addArticleModal');
const closeAddArticle = document.getElementById('closeAddArticle');


if (addArticleBtn) {
    addArticleBtn.addEventListener('click', () => {
        addArticleModal.style.display = 'flex';
    });
}


if (closeAddArticle) {
    closeAddArticle.addEventListener('click', () => {
        addArticleModal.style.display = 'none';
    });
}


window.addEventListener('click', (e) => {
    if (e.target === addArticleModal) {
        addArticleModal.style.display = 'none';
    }
});

// Handle form submission
const addArticleForm = document.getElementById('addArticleForm');
if (addArticleForm) {
    addArticleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(addArticleForm);
        const newArticle = {
            title: formData.get('title'),
            content: formData.get('content'),
            image: formData.get('image'),
            category: formData.get('category'),
            categoryColor: formData.get('category').toLowerCase().replace(/[& ]/g, '-'),
            mood: formData.get('mood'),
            status: formData.get('status'),
            date: new Date().toLocaleDateString(),
            entries: 0
        };

    
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        
        
        articles.unshift(newArticle);        // Save to localStorage
        
        
        localStorage.setItem('articles', JSON.stringify(articles));
        
        
        renderArticles(articles.filter(article => article.status === 'public'));
        
        
        addArticleModal.style.display = 'none';
        addArticleForm.reset();
    });
}

// Add file upload handling
const imageInput = document.getElementById('image');
const uploadLabel = document.querySelector('.upload-label');

uploadLabel.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            imageInput.value = URL.createObjectURL(file);
            uploadLabel.style.borderColor = '#22c55e';
        }
    };
    fileInput.click();
});


const avatarBtn = document.getElementById('avatarBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (avatarBtn && dropdownMenu) {
    document.addEventListener('click', function(e) {
        if (avatarBtn.contains(e.target)) {
            dropdownMenu.classList.toggle('active');
        } else if (!dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
}
