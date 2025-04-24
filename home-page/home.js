let articlesEl =document.getElementById("articleGrid");

const articlesData = [
    {
      id: 1,
      title: "Deadline đầu tiên của kỳ học",
      entries: "Nhật ký học tập",
      content: "Hôm nay mình vừa nộp xong bài tập lớn. Mệt nhưng thấy rất nhẹ nhõm!",
      mood: "Căng thẳng",
      status: "Riêng tư",
      image: "image1.jpg",
      date: "2025-02-23",
    },
    {
      id: 2,
      title: "Cà phê chiều chủ nhật",
      entries: "Nhật ký trải nghiệm - học qua đời sống",
      content: "Ngồi một mình trong quán quen, nghe nhạc lofi và viết vài dòng nhật ký...",
      mood: "Thư giãn",
      status: "Công khai",
      image: "image2.jpg",
      date: "2025-03-15",
    },
    {
      id: 3,
      title: "A Productive Day at Work",
      entries: "Daily Journal",
      content: "Today was a really productive day at work. I managed to finish a report ahead of schedule and received positive feedback from my manager.",
      mood: "Productive",
      status: "Public",
      image: "../PNJ/Image (1).png",
      date: "2025-02-25",
      category: "Daily Journal",
      categoryColor: "", // You can add color information if needed
    },
    {
      id: 4,
      title: "My First Job Interview Experience",
      entries: "Work & Career",
      content: "I had my first job interview today! I was nervous at first, but as the conversation went on, I felt more confident.",
      mood: "Nervous but hopeful",
      status: "Public",
      image: "../PNJ/Image (2).png",
      date: "2025-02-24",
      category: "Work & Career",
      categoryColor: "blue",
    },
    {
      id: 5,
      title: "Overthinking Everything",
      entries: "Personal Thoughts",
      content: "Lately, I have been overthinking everything, from small decisions to bigger life choices. I know I should trust myself.",
      mood: "Anxious",
      status: "Public",
      image: "../PNJ/Image (4).png",
      date: "2025-02-23",
      category: "Personal Thoughts",
      categoryColor: "green",
    },
    {
      id: 6,
      title: "How collaboration makes us better designers",
      entries: "Work & Career",
      content: "Collaboration can make our teams stronger, and our individual designs better.",
      mood: "Informative",
      status: "Public",
      image: "../PNJ/Image (6).png",
      date: "2025-02-16",
      category: "Work & Career",
      categoryColor: "blue",
    },
    {
      id: 7,
      title: "Our top 10 Javascript frameworks to use",
      entries: "Work & Career",
      content: "JavaScript frameworks make development easy with extensive features and functionalities.",
      mood: "Informative",
      status: "Public",
      image: "../PNJ/Image (7).png",
      date: "2025-02-15",
      category: "Work & Career",
      categoryColor: "blue",
    },
    {
      id: 8,
      title: "Podcast: Creating a better CX Community",
      entries: "Emotions & Feelings",
      content: "Starting a community doesn't need to be complicated, but how do you get started?",
      mood: "Insightful",
      status: "Public",
      image: "../PNJ/Image (8).png",
      date: "2025-02-05",
      category: "Emotions & Feelings",
      categoryColor: "purple",
    },
  ];
  
  console.log(articlesData);

function renderArticles(list = articlesData) {
    // let data = '';
    // list.forEach((article) =>{
    //     data += `
    //      <div class="main-blog-card">
    //             <img src="${article.image}" alt="${article.title}" class="main-blog-card-img">
    //             <div class="main-blog-card-content">
    //                 <div class="main-blog-card-date">Date: ${article.date}</div>
    //                 <div class="main-blog-card-title">${article.title}</div>
    //                 <div class="main-blog-card-desc">${article.content}</div>
    //                 <div class="main-blog-card-category">
    //                     <span class="main-category-badge main-category-${article.categoryColor}">${article.category}</span>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // })


    

    // sử dụng reduce để tạo chuỗi HTML
  //   let data = list.reduce((temp,article) =>{
  //     return temp + `
  //      <div class="main-blog-card">
  //             <img src="${article.image}" alt="${article.title}" class="main-blog-card-img">
  //             <div class="main-blog-card-content">
  //                 <div class="main-blog-card-date">Date: ${article.date}</div>
  //                 <div class="main-blog-card-title">${article.title}</div>
  //                 <div class="main-blog-card-desc">${article.content}</div>
  //                 <div class="main-blog-card-category">
  //                     <span class="main-category-badge main-category-${article.categoryColor}">${article.category}</span>
  //                 </div>
  //             </div>
  //         </div>
  //     `;
  // },'');




  // sử dụng map để tạo chuỗi HTML
  let data = list.map((article) =>{
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
    console.log(data.join(''));
    articlesEl.innerHTML = data.join('');
}

renderArticles();






document.addEventListener('DOMContentLoaded', function() {
    const avatarBtn = document.getElementById('avatarBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    document.addEventListener('click', function(e) {
        if (avatarBtn.contains(e.target)) {
            dropdownMenu.classList.toggle('active');
        } else if (!dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Add New Article Modal logic
    const addArticleBtn = document.querySelector('.main-add-article');
    const addArticleModal = document.getElementById('addArticleModal');
    const closeAddArticle = document.getElementById('closeAddArticle');

    if (addArticleBtn && addArticleModal && closeAddArticle) {
        addArticleBtn.addEventListener('click', function() {
            addArticleModal.style.display = 'flex';
        });
        closeAddArticle.addEventListener('click', function() {
            addArticleModal.style.display = 'none';
        });
        // Hide modal when clicking backdrop
        addArticleModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-article-backdrop')) {
                addArticleModal.style.display = 'none';
            }
        });
    }
});
