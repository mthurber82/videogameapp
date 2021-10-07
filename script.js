// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('needID');
var platform = document.getElementById('needID');
var genre = document.getElementById('form-stacked-select');
var key = "385f0044190e471aa3e65b5f36e4f71a";


// function to create a list of games upon search request
function searchGames() {
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
            console.log(data.results[i].name);
            // to do 
            // dynamically create elements here
            // set card values to data results
            // dynamically create buttons for youtube element
            // set youtube attribute to ("target", "_blank")
            // append elements to page
        }
        return data;
    })
};

// add event listener to main search button
search.addEventListener("click", function() {
    // create variable for user search input
    var game = gameInput.value;
    // return function with user search input
    searchGames(game);
});

