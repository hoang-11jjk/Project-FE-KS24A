

class Entrie{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

class Article{
    constructor(id, title, Entrie, content, mood, status, image, date){
        this.id = id;
        this.title = title;
        this.Entrie = Entrie;
        this.content = content;
        this.mood = mood;
        this.status = status;
        this.image = image;
        this.date = date;
    }
}

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

let articles = JSON.parse(localStorage.getItem('articles')) || [];
function updateArticles(){
    localStorage.setItem('articles', JSON.stringify(articles));
}

let entries = JSON.parse(localStorage.getItem('entries')) || [];
function updateEntries(){
    localStorage.setItem('entries', JSON.stringify(entries));
}

export { users, updateData ,Article, articles, updateArticles, Entrie, entries, updateEntries };