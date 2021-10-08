// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('needID');
var platform = document.getElementById('needID');
var consoleType = document.getElementById("console_type");
var players = document.getElementById('player-input');
var genre = document.getElementById("genreDropDown");
// var genre = document.getElementById('form-stacked-select');
var key = "385f0044190e471aa3e65b5f36e4f71a";


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
        console.log(data)
        //create for loop to increment through each returned search result
        for(var i = 0; i < data.results.length; i++) {
        //     console.log(data.results[i].name);
        //     // to do 
        //     // dynamically create elements here
        //     // set card values to data results
        //     // dynamically create buttons for youtube element
        //     // set youtube attribute to ("target", "_blank")
        //     // append elements to page
        }
        return data;
    })
};

// add event listener to main search button
search.addEventListener("click", function() {
    // create variable for user search input
    // var game = gameInput.value;
    let user_input = document.getElementById("userinput")
    // console.log(user_input.value)
    let game = user_input.value
    // return function with user search input
    searchGames(game);
    
});


// console.log(genre);
//drop down
genre.addEventListener("change", function (e) {
console.log(e.target.value)
})

//Radio button
consoleType.addEventListener("change", function () {
    array1 = []
    let temp =consoleType.getElementsByClassName("uk-radio")
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
            array1.push(temp[i].id)
            
        }
        console.log(array1[i])
    }
    

    return
      
})

//listen to changes in the number of players from the search parameter 
players.addEventListener("change", function() {
    array2 = [];
    let plyr = players.getElementsByClassName("player-num");
    for (var i = 0; i < plyr.length; i++) {
        if (plyr[i].checked) {
            array2.push(plyr[i].id);
            // console.log(plyr[i].id);
        }
    }
        choosePlayer(array2);
});


// create function to append chosen values to search url
function choosePlayer(value) {
    var player1 = null;
    var player2 = null;

    for( var i=0; i<value.length; i++) {
        if (value[i] === 'singleplayer') {
            player1 = 'singleplayer'
            console.log(player1)
        }
        if (value[i] === 'multiplayer') {
            player2 = 'multiplayer'
            console.log(player2)
        }
    }
    if (player1 !== null && player2 === null) {
        // return player1;
        console.log(player1)
    }

    if (player1 !== null && player2 !== null) {
        let player3 = player1 + ',' + player2;
        // return player3;
        console.log(player3)
    }
};

searchParameters.addEventListener('click', function() {
    
});

    // for (let i = 0; i < consoleType.length; i++){
    //     console.log(consoleType[i].id)
    // }
  

// for (let i = 0; i < consoleType.length; i++) {
//     consoleType[i].addEventListener("change", function() {
//       let val = this.value; // this == the clicked radio,
//       console.log(val);
//     });
//   }


// var searchGameBtn = document.addEventListener("click", function (event) {
//     console.log("helo")
// })
// grab elements with variables
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
// fetch("https://api.rawg.io/api/games?search=vampire-the-masquerade-bloodlines-2&key=" + APIKey)
//     .then(function (response) {
        
        
//         return response.json();
        
      
//     })
//     .then(function (data) {
//         console.log(data)
//         return data;
//     })
    
    // more code
//First thing we want to do is create an unqiue ID/class for each selction
//Than we will need to use document.getElementById/Class to grab the value and store it a local variable in the function

//lastly when we the user clicks the submit button (eventlistener) 
//after the button is click it will send the variable over to a fetch method to send the request
    //function for getting all the video game parameters
    
    //and adding it to fetch method

    