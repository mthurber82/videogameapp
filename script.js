// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('needID');
var platform = document.getElementById('needID');
var genre = document.getElementById('form-stacked-select');
var key = "385f0044190e471aa3e65b5f36e4f71a";

// create function to get RAWG api
// fetch rawg url 
// then statement
// create for loop to dynamically create elements
// create div element
// create text element
// create image element?
// set element content and text
// add classes to connect with stylesheet of choice
// dynamically create buttons for youtube element
// set youtube attribute to ("target", "_blank")
// append div element to document
// append text element to div element 
// append button element to div element 

function searchGames() {
    var gameSearchURL = 'https://api.rawg.io/api/games?search='+game+'&key='+key;

    fetch(gameSearchURL)
    .then(function (response) {
        
        return response.json();
      
    })
    .then(function (data) {
        console.log(data.result[0].name)
        return data;
    })
}

search.addEventListener("click", function() {
    var games = gameInput.value;
    searchGames(games);
})

fetch("https://api.rawg.io/api/games?search=vampire-the-masquerade-bloodlines-2&key=" + key)
    .then(function (response) {
        
        
        return response.json();
        
      
    })
    .then(function (data) {
        console.log(data)
        return data;
    })