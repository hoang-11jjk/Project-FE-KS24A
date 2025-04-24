let articlesEl = document.getElementsByTagName("tbody")[0];

const articlesData = [
  {
    id: 3,
    title: "A Productive Day at Work",
    entries: "Daily Journal",
    content:
      "Today was a really productive day at work. I managed to finish a report ahead of schedule and received positive feedback from my manager.",
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
    content:
      "I had my first job interview today! I was nervous at first, but as the conversation went on, I felt more confident.",
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
    content:
      "Lately, I have been overthinking everything, from small decisions to bigger life choices. I know I should trust myself.",
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
    content:
      "Collaboration can make our teams stronger, and our individual designs better.",
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
    content:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
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
    content:
      "Starting a community doesn't need to be complicated, but how do you get started?",
    mood: "Insightful",
    status: "Private",
    image: "../PNJ/Image (8).png",
    date: "2025-02-05",
    category: "Emotions & Feelings",
    categoryColor: "purple",
  },
];

console.log(articlesData);

const changeStatus=(id, value) =>{
    articlesData[id].status = value;
    renderArticles();
}




function renderArticles(list = articlesData) {
  // sử dụng reduce để tạo chuỗi HTML
  let data = list.reduce((temp, article, index) => {
    return (
      temp +
      `<tr>
      <td>
          <img src="${article.image}" class="thumb" alt="thumb">
      </td>
      <td>${article.title}</td>
      <td>${article.entries}</td>
      <td>${formatContent(article.content)}</td>
      <td>
          <span class="status public">${article.status}</span>
      </td>
      <td>
          <select  class="status-select" id="${index}" onchange="changeStatus(${index}, this.value)">
              <option ${article.status === "Public"? "selected":" "} value="Public">Public</option>
              <option ${article.status === "Private"? "selected":" "} value="Private">Private</option>
          </select>
      </td>
      <td>
          <button class="edit-btn">Sửa</button>
          <button class="delete-btn">Xóa</button>
      </td>
  </tr>`
    );
    
  }, "");
  articlesEl.innerHTML = data;
}


renderArticles();

function formatContent(content){
    return content.length > 20 ? content.substring(0, 50) + '...' : content;
}

// let selectEl = document.querySelectorAll("select");

// selectEl.forEach((select) => {
//     select.addEventListener("change", function (e) {
//         console.log(e.target.value);
//         console.log(this.id);
//         articlesData[this.id].status = e.target.value;
//         renderArticles();
//     }
//     );
// });

