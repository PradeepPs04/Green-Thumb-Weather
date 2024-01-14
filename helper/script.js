// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
const resultsContainer = document.querySelector('.results');

icon.addEventListener('click', function(event) {
    event.preventDefault();
    const searchTerm = inputBox.value;
    if(searchTerm) {
        searchWikipedia(searchTerm);
    }
});

function searchWikipedia(searchTerm) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

    fetch(url).then(response => response.json()).then(data => {
        displayResults(data.query.search);
    }).catch(error => alert('Error : ' + error));
}

function displayResults(results) {
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if (userData) {
        emptyArray = suggestions.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else {
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


let selectedSuggestionIndex = -1; // to keep track of the selected suggestion
// to select from the suggetions using arrow keys up and down
inputBox.addEventListener('keydown', function(e) {
    let allList = suggBox.querySelectorAll("li");
    
    if (searchWrapper.classList.contains("active")) {
        if (e.key === "ArrowDown") {
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % allList.length;
        } else if (e.key === "ArrowUp") {
            selectedSuggestionIndex = (selectedSuggestionIndex - 1 + allList.length) % allList.length;
        } else if (e.key === "Enter") {
            if (selectedSuggestionIndex !== -1) {
                inputBox.value = allList[selectedSuggestionIndex].textContent;
            }
            searchWrapper.classList.remove("active");
            selectedSuggestionIndex = -1; // reset the selected index
        }
        
        // Update the class for highlighting the selected suggestion
        allList.forEach((item, index) => {
            item.classList.toggle("selected", index === selectedSuggestionIndex);
        });
    }
});