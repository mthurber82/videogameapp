// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('userimput');
var platform = document.getElementsByClassName("platformDropDown")[0];
var players = document.getElementsByClassName('playerDropDown')[0];
var genre = document.getElementsByClassName("genreDropDown")[0];
var gameSection = document.getElementById("gamequery");
var gameTabButton = document.getElementById('gamequery-button')
var favoritesSection = document.getElementById("favorites");
var favTabButton = document.getElementById('favorite-button');
var key = "385f0044190e471aa3e65b5f36e4f71a";
var youtubekey = 'AIzaSyC64T6BjOZg3D0Zp4OvGS0bzSta1I8ix6M';

// declare global arrays
var globalPlatform;
var globalGenre;
var globalPlayers;
var pageResults = [];
var keyNameArray = [];
let lastUniqueItem;
let storedArray = []
let uniqueKeys = [];


// add event listener to main search button
search.addEventListener("click", function () {
    $( "#gamequery" ).empty();
    //reset game card elements
    let user_input = document.getElementById("userinput")
    // console.log(user_input.value)
    let game = user_input.value
    searchGames(game);
});



// function to add event listeners to drop down game options
platform.addEventListener("change", function () {
    let localPlatform = $('.platformDropDown :selected').text();
    localStorage.setItem('platform', localPlatform);
})

players.addEventListener("change", function () {
    let localPlayers = $('.playerDropDown :selected').text();
    localStorage.setItem('players', localPlayers);
})

genre.addEventListener("change", function () {
    let localGenre = $('.genreDropDown :selected').text();
    localStorage.setItem('genre', localGenre);
})



// create cards on page load
window.onload = function() {
    baseCards();
    checks();
  };



// function to toggle tab elements between hidden and visible when each tab is clicked
function gameTabs(evt, gameTab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(gameTab).style.display = "block";
    evt.currentTarget.className += "active";
}



// function to add elements to local storage when plus button is clicked
function checks() {
    let uniqueAddresses = [];
    // add event listener to add favorites function
    gameSection.addEventListener('click', function (e) {
        $( "#favorites" ).empty();
        console.log(e.target.parentNode.parentNode)
        // get favorites button from document using its set data attribute
        var keyName = e.target.getAttribute('data-attrId')
        keyNameArray.push(keyName);
        // declare variable to access later to set inner html of each card favorited
        let cardHTML;

        if (e.target.parentNode.parentNode.parentNode !== "" || e.target.parentNode.parentNode.parentNode !== null) {

            // find entire card HTML by navigating the DOM
            let cardParent = e.target.parentNode.parentNode.parentNode;
            cardHTML = cardParent.innerHTML;

            //filter to sift through keyNameArray and prevent duplicate cards
             keyNameArray.forEach((c) => {
                if (!uniqueKeys.includes(c) && (c) !== null) {
                    uniqueKeys.push(c);
                }
            });

            //push the most recent item in unique keys to a new array to append later
             lastUniqueItem = uniqueKeys[uniqueKeys.length - 1]
            if (lastUniqueItem !== null) {
                if (!storedArray.includes(lastUniqueItem)) {
                    //
                    storedArray.push({
                        id: lastUniqueItem,
                        value: cardHTML,
                    })
                }

                // filter through new array for duplicates and append card for each new item
                uniqueAddresses = Array.from(new Set(storedArray.map(a => a.id)))
                .map(id => {
                  return storedArray.find(a => a.id === id)
                })
              console.log(uniqueAddresses)

                localStorage.setItem("keyitem", JSON.stringify(uniqueAddresses))
            }
            for (let i = 0; i < uniqueAddresses.length; i++){
                console.log(uniqueAddresses[i].value)
                var htmltag = uniqueAddresses[i].value
            // // append card elelemts to the page
                var cardEl = document.createElement('div');
                cardEl.classList.add('grid');
                cardEl.innerHTML = htmltag;
                favoritesSection.appendChild(cardEl);
            }
        }
    })
}



// function to create game cards depending on the number of items returned
function gameCards(data) {
    for(var i = 0; i < data.results.length; i++) {
        // create game cards using for loop and passing through data into html elements to appended them to the page.
            var htmltag = `
            <div class="uk-card uk-card-default game-card">
                <div class="uk-card-media-top">
                    <img src='${data.results[i].background_image}' alt = '${data.results[i].name}'></img>
                </div>
            <div class="uk-card-body">
                <button class="add-favorite" data-attrId="${data.results[i].id}">+</button>
                <h4 class="card-title">${data.results[i].name}</h4>
                <div class="hidden">
                    <p class="card-item">Rating: ${data.results[i].rating}</p>
                    <p class="card-item">Released: ${data.results[i].released}</p>
                    <button class="reddit-button">Reddit [coming soon]</button>
                    <button class="ytube-button" data-slug="${data.results[i].slug}">YouTube </button>
                </div>
            </div>
            </div>`
        // append card elelemts to the page
            var cardEl = document.createElement('div');
            cardEl.classList.add('grid');
            cardEl.innerHTML = htmltag;
            gameSection.appendChild(cardEl);

    }
}



// function to create popular game cards as default upon loading the page
function baseCards() {
    console.log('this ran when it wasnt supposed to')
    // fetching random games using RAWG url
    var gameURL = 'https://api.rawg.io/api/games?page_size=40&key=' + key;
    fetch(gameURL)
        // then statement to conver to JSON
        .then(function (response) {
            return response.json();
        })
        // then statement to input data into a for loop
        .then(function (data) {
            // run game cards function to genreate card for each game
            gameCards(data);
        })
};



// event listener for youtube buttons to call youtube API
document.addEventListener('click',function(e){
    if(e.target.className == 'ytube-button'){
        var slugs = e.target.getAttribute("data-slug");
        var youtubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+slugs+'&key=' + youtubekey;
            fetch(youtubeURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let videoid = data.items[0].id.videoId
                    console.log(videoid)

                    target = 'https://www.youtube.com/watch?app=desktop&v='+videoid;
                    window.open(target, '_blank').focus();
                })
     }
 });



 // function to find specific games when searched 
function searchGames(game) {
    // url variable
    var gameSearchURL = 'https://api.rawg.io/api/games?search=' + game + '&key=' + key;
    fetch(gameSearchURL)
        // return response and convert to json
        .then(function (response) {
            return response.json();
        })
        //return json response as data
        .then(function (data) {
            //create for loop to increment through each returned search result
            if (data.results.length === 0) {
                var noResults = `<div class="uk-card uk-card-default game-card no-results">
            <div class="uk-card-body">
                <h4 class="card-title">No Results Found</h4>
            </div>
            </div>`

                var noResultCard = document.createElement('div');
                noResultCard.classList.add('grid');
                noResultCard.innerHTML = noResults;
                gameSection.appendChild(noResultCard);
            }
            else {
                for (var i = 0; i < data.results.length; i++) {
                        var htmltag = `
                    <div class="uk-card uk-card-default game-card">
                        <div class="uk-card-media-top">
                            <img src='${data.results[i].background_image}' alt ='${data.results[i].name}'></img>
                        </div>
                    <div class="uk-card-body">
                        <button class="add-favorite" data-attrId="${data.results[i].id}">+</button>
                        <h4 class="card-title">${data.results[i].name}</h4>
                        <div class="hidden">
                            <p class="card-item">Rating: ${data.results[i].rating}</p>
                            <p class="card-item">Released: ${data.results[i].released}</p>
                            <button class="reddit-button">Reddit [coming soon]</button>
                            <button class="ytube-button">YouTube</button>
                        </div>
                    </div>
                    </div>`

                        var cardEl = document.createElement('div');
                        cardEl.classList.add('grid');
                        cardEl.innerHTML = htmltag;
                        gameSection.appendChild(cardEl);
                }
            }
            return data;
        })
};



// load 120 results to filter from using drop downs
function gameArrayFunction() {
    //fetch specific page from RAWG api
    let gameArray = [];
        var fetchPages = 'https://api.rawg.io/api/games?page_size=40&page=2&key=' + key
        fetch(fetchPages)

            .then(function (response) {
                return response.json();
            })
            //return json response as data
            .then(function (data) {
                // concats data to an existing array
                gameArray = gameArray.concat(data.results)
                // pushes concatinated data to a new array
                pageResults.push(arrayFunction(gameArray))
            })
};



// filter function for drop downs
function arrayFunction(filterArray) {
    // create variables that fetch drop down data from local storage
    let globalGenre1 = localStorage.getItem('genre');
    let globalPlayers1 = localStorage.getItem('players');
    let globalPlatform1 = localStorage.getItem('platform');

    // create array of filtered games that match the criteria of the user input
    var userChoiceArr = filterArray.filter(game => game.genres.map(g => g.name).includes(globalGenre1))
        .filter(game => game.parent_platforms.map(g => g.platform.name).includes(globalPlatform1))
    .filter(game => game.tags.map(g => g.name).includes(globalPlayers1));

    // clear gamequery to append cards displaying user's search parameters
    $( "#gamequery" ).empty()

    for(var i = 0; i < userChoiceArr.length; i++) {
        // create game cards using for loop and passing through data into html elements to appended them to the page.
            var htmltag = `
            <div class="uk-card uk-card-default game-card">
                <div class="uk-card-media-top">
                    <img src='${userChoiceArr[i].background_image}''  alt = '${userChoiceArr[i].name}'></img>
                </div>
            <div class="uk-card-body">
                <button class="add-favorite" data-attrId="${userChoiceArr[i].id}">+</button>
                <h4 class="card-title">${userChoiceArr[i].name}</h4>
                <div class="hidden">
                    <p class="card-item">Rating: ${userChoiceArr[i].rating}</p>
                    <p class="card-item">Released: ${userChoiceArr[i].released}</p>
                    <button class="reddit-button">Reddit [coming soon]</button>
                    <button class="ytube-button" data-slug="${userChoiceArr[i].slug}">YouTube </button>
                </div>
            </div>
            </div>`
        // append card elelemts to the page
            var cardEl = document.createElement('div');
            cardEl.classList.add('grid');
            cardEl.innerHTML = htmltag;
            gameSection.appendChild(cardEl);
    }
    return userChoiceArr;
}

// event listener for search games drop down button
searchParameters.addEventListener('click', function(event) {
    event.preventDefault();
    gameArrayFunction();
})
