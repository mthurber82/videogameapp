// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('userimput');
var platform = document.getElementsByClassName("platformDropDown")[0];
var players = document.getElementsByClassName('playerDropDown')[0];
var genre = document.getElementsByClassName("genreDropDown")[0];
var gameSection = document.getElementById("gamequery");
var favoritesSection = document.getElementById("favorites");
var key = "385f0044190e471aa3e65b5f36e4f71a";

var favoriteButton;
var globalPlatform;
var globalGenre;
var globalPlayers;
var temp = [];
var favoriteButtonArray = [];

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
        checks()
    })
};
baseCards();


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

function checks() {
    // favoriteButton = document.querySelector('.add-favorite');
    gameSection.addEventListener('click', function (e) {
       
        if (e.target.getAttribute("data-attrid") === "" || e.target.getAttribute("data-attrid") === null) {
            // console.log(e.target)
        } else {
            let fTemp = localStorage.setItem("favorites", JSON.stringify(favoriteButtonArray))
            // console.log(favoriteButtonArray);
            favoriteButtonArray.push(e.target.getAttribute("data-attrid"))
        }
    })
}


function favoriteFunction() {
    // favArray = favoriteButtonArray[0]
    favArray = localStorage.getItem('favorites');
    let tempi = JSON.parse(favArray)
    console.log(JSON.parse(favArray))
    for (var i=0; i<tempi.length; i++) {
        var favURL = 'https://api.rawg.io/api/games/'+tempi[i]+'?&key=' + key;
        fetch(favURL) 
        // console.log(favURL)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for(var i = 0; i < data.length; i++) {
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
                
                    var test = document.createElement('div');
                    test.classList.add('grid');
                    test.innerHTML = htmltag;
                    favoritesSection.appendChild(test);
                    
            }
        })
    }
}
favoriteFunction();

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
        //create for loop to increment through each returned search result
        for(var i = 0; i < data.results.length; i++) {
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
            
                var test = document.createElement('div')
                test.classList.add('grid')
                test.innerHTML = htmltag
                gameSection.appendChild(test)
            }   
        }
        return data;
    })
};

// add event listener to main search button
search.addEventListener("click", function() {
    //reset game card elements
    
    let user_input = document.getElementById("userinput")
    // console.log(user_input.value)
    let game = user_input.value
    searchGames(game); 
});

platform.addEventListener("change", function () {
    let localPlatform = $('.platformDropDown :selected').text();
    var storedPlatform = localStorage.setItem('platform', localPlatform);
})

players.addEventListener("change", function() {
     let localPlayers = $('.playerDropDown :selected').text();
    if (localPlayers === 'Singleplayer') {
        var storedPlayers = localStorage.setItem('players', 31);
    }
    if (localPlayers === 'Multiplayer') {
        var storedPlayers = localStorage.setItem('players', 7);
    }
})

genre.addEventListener("change", function() {
    let localGenre = $('.genreDropDown :selected').text();
    var storedGenre = localStorage.setItem('genre', localGenre);
})

// drop down function
function gameArrayFunction() {
    // console.log()
    let gameArray = [];
    // console.log('first')
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

    // console.log(globalPlatform1, globalGenre1, globalPlayers1);
    
    var userChoiceArr = filterArray.filter(game => game.genres.map(g => g.name).includes(globalGenre1))
    .filter(game => game.parent_platforms.map(g => g.platform.name).includes(globalPlatform1))
    // .filter(game => game.tags.map(g => g.id).includes(globalPlayers1));

    console.log(userChoiceArr);
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