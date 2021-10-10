// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('userimput');
var platform = document.getElementsByClassName("platformDropDown")[0];
var players = document.getElementsByClassName('playerDropDown')[0];
var genre = document.getElementsByClassName("genreDropDown")[0];
var gameSection = document.getElementById("gamequery");
var key = "385f0044190e471aa3e65b5f36e4f71a";

var favoriteButton;
var globalPlatform;
var globalGenre;
var globalPlayers;
var temp = [];

function baseCards() {
    

    var gameURL = 'https://api.rawg.io/api/games?&key='+key;
    fetch(gameURL) 

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for(var i = 0; i < data.results.length; i++) {
                var htmltag = `
                <div class="uk-card uk-card-default game-card">
                    <div class="uk-card-media-top">
                        <img src='${data.results[i].background_image}'"></img>
                    </div>
                <div class="uk-card-body">
                    <button class="add-favorite">+</button>
                    <h4>${data.results[i].name}</h4>
                    <div class="hidden">
                        <p class="card-item">Rating: ${data.results[i].rating}</p>
                        <button class="reddit-button">Reddit</button>
                        <button class="ytube-button">YouTube</button>
                        <p class="always-hidden">${data.results[i].id}</p>
                    </div>

                </div>
                </div>`
            
                var test = document.createElement('div')
                test.classList.add('grid')
                test.innerHTML = htmltag
                gameSection.appendChild(test)
                
                
        }
        favoriteButton = document.querySelector('.add-favorite');
        
    })
};
baseCards();

// favoriteButton.addEventListener('click', function(e) {
//     console.log(e.target.parentNode.parentNode);
// })
// function to create a list of games upon search request
function searchGames(game) {
    // url variable
    var gameSearchURL = 'https://api.rawg.io/api/games?search='+game+'&key='+key;
    fetch(gameSearchURL)
    // return response and convert to json
        .then(function (response) {
        return response.json();
    })
    //return json response as data
        .then(function (data) {
        // console.log(data)
        //create for loop to increment through each returned search result
        for(var i = 0; i < data.results.length; i++) {
            // if (data.results.length === 0) {
            //     var noResult = document.createElement('p')
            //     noResult.textContent = "No Results Found."
            //     gameSection.appendChild(noResults)
            // }
            // else {
                var htmltag = `
                <div class="uk-card uk-card-default game-card">
                    <div class="uk-card-media-top">
                        <img src='${data.results[i].background_image}'"></img>
                    </div>
                <div class="uk-card-body">
                    <button class="add-favorite">+</button>
                    <h4>${data.results[i].name}</h4>
                    <div class="hidden">
                        <p class="card-item">Rating: ${data.results[i].rating}</p>
                        <button class="ytube-button">YouTube</button>
                    </div>
                </div>
                </div>`
            
                var test = document.createElement('div')
                test.classList.add('grid')
                test.innerHTML = htmltag
                gameSection.appendChild(test)
            // }   
        }
        return data;
    })
};



// add event listener to main search button
search.addEventListener("click", function() {
    //reset game card elements by reloading the page
    

    let user_input = document.getElementById("userinput")
    // console.log(user_input.value)
    let game = user_input.value
    searchGames(game); 
});

platform.addEventListener("change", function () {
    localPlatform = $('.platformDropDown :selected').text();
    var storedPlatform = localStorage.setItem('platform', localPlatform);
})

players.addEventListener("change", function() {
    localPlayers = $('.playerDropDown :selected').text();
    if (localPlayers === 'Singleplayer') {
        var storedPlayers = localStorage.setItem('players', 31);
    }
    if (localPlayers === 'Multiplayer') {
        var storedPlayers = localStorage.setItem('players', 31);
    }
})

genre.addEventListener("change", function() {
    localGenre = $('.genreDropDown :selected').text();
    var storedGenre = localStorage.setItem('genre', localGenre);
})

// drop down function
function gameArrayFunction() {
    // console.log()
    let gameArray = [];
    console.log('first')
    for (var i=1; i <= 4; i++) {
        var fetchPages = 'https://api.rawg.io/api/games?page_size=40&page='+i+'&key='+key

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
        temp.push(arrayFunction(gameArray))
        })
    }
};

function arrayFunction(filterArray) {

    let globalGenre1 = localStorage.getItem('genre');
    let globalPlayers1 = localStorage.getItem('players');
    let globalPlatform1 = localStorage.getItem('platform');

    // var globalGenre1 = "Shooter";
    // var globalPlatform1 = "Xbox";
    // var globalPlayers1 = 31;

    console.log(globalPlatform1, globalGenre1, globalPlayers1);
    
    var userChoiceArr = filterArray.filter(game => game.genres.map(g => g.name).includes(globalGenre1))
    .filter(game => game.parent_platforms.map(g => g.platform.name).includes(globalPlatform1))
    // .filter(game => game.tags.map(g => g.id).includes(globalPlayers1))
    console.log(userChoiceArr);
    // console.log("hello world")
    return userChoiceArr;
} 

searchParameters.addEventListener('click', gameArrayFunction());

// alternative to writing filter function
        // var containsThisGenre = false;
        // for (let i = 0; i < game.genres.length; i ++) {
        //     if (game.genres[i].name === genreValue) {
        //         containsThisGenre = true;
        //     }
        // }
        // return containsThisGenre;
        // console.log(game.genres);
        // console.log(game.genres.map(g => g.name))