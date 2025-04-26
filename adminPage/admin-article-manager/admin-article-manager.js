let articlesEl = document.getElementsByTagName("tbody")[0];

// Get articles from localStorage
let articlesData = JSON.parse(localStorage.getItem('articles')) || [];

const changeStatus = (id, value) => {
    articlesData[id].status = value;
    // Save to localStorage after change
    localStorage.setItem('articles', JSON.stringify(articlesData));
    renderArticles();
}

function renderArticles(list = articlesData) {
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
                    <select class="status-select" id="${index}" onchange="changeStatus(${index}, this.value)">
                        <option ${article.status === "Public"? "selected":" "} value="Public">Public</option>
                        <option ${article.status === "Private"? "selected":" "} value="Private">Private</option>
                    </select>
                </td>
                <td>
                    <button class="edit-btn" onclick="editArticle(${index})">Sửa</button>
                    <button class="delete-btn" onclick="deleteArticle(${index})">Xóa</button>
                </td>
            </tr>`
        );
    }, "");
    articlesEl.innerHTML = data;
}

function formatContent(content) {
    return content.length > 20 ? content.substring(0, 50) + '...' : content;
}

function deleteArticle(index) {
    articlesData.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articlesData));
    renderArticles();
}

function editArticle(index) {
    // Add edit functionality here if needed
    console.log("Edit article:", articlesData[index]);
}

// Initial render
renderArticles();

