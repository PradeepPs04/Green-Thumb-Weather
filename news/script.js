const API_KEY = "e1a16de9f81e44da97c08781bdaf4bd3";  // API key for newsAPI 
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Agriculture"));

function reload() {
    window.location.reload();
}


async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if(data.articles.length == 0) {
            alert(`No news found for ${query}`);
        }
        else {
            bindData(data.articles);
        }
    } catch(error) {
        console.error("An error occured while fetching news: ", error);
    }
    // console.log(data);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if(!article.urlToImage) 
            return;
        const cardClone =  newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDescriptioin = cardClone.querySelector('#news-description');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescriptioin.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById("search-btn");
const newsInput = document.getElementById("news-input");

searchBtn.addEventListener("click", () => {
    performSearch();
});

newsInput.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        performSearch();
    }
});

function performSearch() {
    const query = newsInput.value;
    if(!query)  // if user pressing search without entering text
        return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}