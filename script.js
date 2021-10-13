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
let ss;
let array1 = []
let uniqueKeys = [];
// declare global arrays
var favoriteButton;
var globalPlatform;
var globalGenre;
var globalPlayers;
var pageResults = [];
var keyNameArray = [];
var favoriteButtonArray = [];



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
    var storedPlatform = localStorage.setItem('platform', localPlatform);
})

players.addEventListener("change", function () {
    let localPlayers = $('.playerDropDown :selected').text();
    if (localPlayers === 'Singleplayer') {
        var storedPlayers = localStorage.setItem('players', 31);
    }
    if (localPlayers === 'Multiplayer') {
        var storedPlayers = localStorage.setItem('players', 7);
    }
})

genre.addEventListener("change", function () {
    let localGenre = $('.genreDropDown :selected').text();
    var storedGenre = localStorage.setItem('genre', localGenre);
})



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



gameTabButton.addEventListener('click', function() {
    $( "#gamequery" ).empty();
    baseCards();
});

// favTabButton.addEventListener('click', function() {
//     $( "#favorites" ).empty();
//     checks();
// })

// function to add elements to local storage when plus button is clicked
function checks() {



    // favoriteButton = document.querySelector('.add-favorite');
    gameSection.addEventListener('click', function (e) {
        console.log(e.target.parentNode.parentNode)
        var keyName = e.target.getAttribute('data-attrId')
        keyNameArray.push(keyName);
        // console.log(keyNameArray);
        let tempc;
        var arrayforSomething = []
        if (e.target.parentNode.parentNode.parentNode !== "" || e.target.parentNode.parentNode.parentNode !== null) {
        
            let something = e.target.parentNode.parentNode.parentNode
            tempc = something.innerHTML
             keyNameArray.forEach((c) => {
                if (!uniqueKeys.includes(c) && (c) !== null) {
                    uniqueKeys.push(c);
                    
                }
            });
         
            
             ss = uniqueKeys[uniqueKeys.length - 1]
            
            if (ss !== null) {
                if (!array1.includes(ss)) {
                    // console.log(ss)
                    array1.push({
                        id: ss,
                        value: tempc,
                    })
                    // console.log(array1[array1.length-1])
                }
              
                // console.log(array1.length)
                // console.log(array1[1])
                localStorage.setItem("keyitem", JSON.stringify(array1))

            }
            let somethelse = localStorage.getItem("keyitem")
            let gel = JSON.parse(somethelse)
            // console.log(gel)
            for (let i = 0; i < array1.length; i++){
                console.log(array1[i])
            }

            // for (var i=0; i<uniqueKeys.length; i++) {
            //     localStorage.setItem(uniqueKeys[i], e.target.parentNode.parentNode.parentNode.innerHTML);
            // }
            // arrayforSomething.push([{
            //     id: uniqueKeys[e.getAttribute[]],
                    
            //      value: something,

            // }])
            // console.log(arrayforSomething)
            localStorage.setItem('unique-keys', uniqueKeys);
            console.log(uniqueKeys);
            getLocalStorage();
        }
    })
}
checks()


function getLocalStorage() {
    var keyItems = localStorage.getItem('unique-keys');
    var splitKeys = keyItems.split(',');

    console.log(splitKeys.length)
    console.log(splitKeys[0])
    console.log(splitKeys[1])
    console.log(splitKeys[2])
    for (var i=0; i< splitKeys.length; i++) {

        var cardEl = document.createElement('div');
        cardEl.classList.add('grid');
        cardEl.innerHTML = localStorage.getItem(splitKeys[i]);
        favoritesSection.append(cardEl);
    }
}
getLocalStorage();



function gameCards(data) {
    for(var i = 0; i < data.results.length; i++) {
        // create game cards using for loop and passing through data into html elements to appended them to the page.
            var htmltag = `
            <div class="uk-card uk-card-default game-card">
                <div class="uk-card-media-top">
                    <img src='${data.results[i].background_image}'"></img>
                </div>
            <div class="uk-card-body">
                <button class="add-favorite" data-attrId="${data.results[i].id}">+</button>
                <h4 class="card-title">${data.results[i].name}</h4>
                <div class="hidden">
                    <p class="card-item">Rating: ${data.results[i].rating}</p>
                    <p class="card-item">Released: ${data.results[i].released}</p>
                    <button class="reddit-button">Reddit</button>
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
    // fetching random games using RAWG url
    var gameURL = 'https://api.rawg.io/api/games?&key=' + key;
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
baseCards();



document.addEventListener('click',function(e){
    if(e.target.className == 'ytube-button'){
        var slugs = e.target.getAttribute("data-slug");
        var youtubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q='+slugs+'&key=' + youtubekey;
            fetch(youtubeURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let videoidtemp = data.items[0].id.videoId
                    console.log(videoidtemp)

                    target = 'https://www.youtube.com/watch?app=desktop&v='+videoidtemp;
                    window.open(target, '_blank').focus();
                })
     }
 });



// function to dynamically create card elements from local storage and appending them to the favorites tab
// function favoriteFunction() {
//     favoriteCard = localStorage.getItem('favorites');

//     var cardEl = document.createElement('div');
//     cardEl.classList.add('grid');
//     cardEl.innerHTML = JSON.stringify(favoriteCard);
//     favoritesSection.appendChild(cardEl);
// }
// call favorite function upon loading of the page
// favoriteFunction();



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
            for (var i = 0; i < data.results.length; i++) {
                if (data.results.length === 0) {
                    var noResult = document.createElement('p')
                    noResult.textContent = "No Results Found."
                    gameSection.appendChild(noResults)
                }
                else {
                    var htmltag = `
                <div class="uk-card uk-card-default game-card">
                    <div class="uk-card-media-top">
                        <img src='${data.results[i].background_image}'"></img>
                    </div>
                <div class="uk-card-body">
                    <button class="add-favorite" data-attrId="${data.results[i].id}"">+</button>
                    <h4 class="card-title">${data.results[i].name}</h4>
                    <div class="hidden">
                        <p class="card-item">Rating: ${data.results[i].rating}</p>
                        <p class="card-item">Released: ${data.results[i].released}</p>
                        <button class="reddit-button">Reddit</button>
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
    // console.log()
    let gameArray = [];
    // console.log('first')
    for (var i = 1; i <= 4; i++) {
        var fetchPages = 'https://api.rawg.io/api/games?page_size=40&page=' + i + '&key=' + key

        fetch(fetchPages)
            .then(function (response) {
                return response.json();
            })
            //return json response as data
            .then(function (data) {
                //console.log(data)
                gameArray = gameArray.concat(data.results)
                // console.log(gameArray);
                // console.log(arrayFunction(gameArray));
                pageResults.push(arrayFunction(gameArray))
            })
    }
};

// filter function for drop downs
function arrayFunction(filterArray) {

    let globalGenre1 = localStorage.getItem('genre');
    let globalPlayers1 = localStorage.getItem('players');
    let globalPlatform1 = localStorage.getItem('platform');

    // var globalGenre1 = "Racing";   
    // var globalPlatform1 = "Xbox";
    //  var globalPlayers1 = 7;
    console.log(filterArray)

     console.log(globalPlatform1, globalGenre1, globalPlayers1);

    var userChoiceArr = filterArray.filter(game => game.genres.map(g => g.name).includes(globalGenre1))
        .filter(game => game.parent_platforms.map(g => g.platform.name).includes(globalPlatform1))
     .filter(game => game.tags.map(g => g.id).includes(globalPlayers1));

    console.log(userChoiceArr);

    
    return userChoiceArr;
}

searchParameters.addEventListener('click', gameArrayFunction())

// searchParameters.addEventListener('click', function() {
//     location.reload();
// });
