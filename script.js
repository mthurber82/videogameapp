// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('needID');
var platform = document.getElementById('needID');
var consoleType = document.getElementById("console_type");
var players = document.getElementById('player-input');
var genre = document.getElementById("genreDropDown");
var gameSection = document.getElementById("gamequery");
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
            if (data.results.length === 0) {
                //append text box to page saying no results found
            }
            else {
        //        $(`
        //         <div id="hello-world${i}" class="uk-card uk-card-default uk-child-width-1-2" uk-grid>
        //         <div class="uk-card-media-left uk-cover-container">
        //            <img src="" alt="${data.results[i].background_image}" uk-cover>
        //            <canvas width="" height=""></canvas>
        //        </div>
        //        <div>
        //            <div class="uk-card-body"></div>
        //        </div>
        //    </div>`)
            }
        
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
        }
    }
        choosePlayer(array2);
});



// create function to append chosen values to search url
function choosePlayer(value) {
    let player1 = null;
    let player2 = null;
    let playerArr = [];
    for( var i=0; i<value.length; i++) {
        if (value[i] === 'singleplayer') {
            player1 = '31' // tag id for singleplayer
            console.log(player1)
        }
        if (value[i] === 'multiplayer') {
            player2 = '7' // tag id for multiplayer
            console.log(player2)
        }

    }
    if (player1 !== null && player2 === null) {
        playerArr.push(player1)
    }
    if (player2 !== null && player1 === null) {
        playerArr.push(player2)
    }
    if (player1 !== null && player2 !== null) {
        let player3 = player1 + ',' + player2;
        playerArr.push(player3)
    }
    createPlayerURL(playerArr);
};



function createPlayerURL(playerArr) {
    console.log(playerArr)
    let gameArray = [];
    
    for (var i=1; i <= 4; i++) {

        var fetchPages = 'https://api.rawg.io/api/games?page_size=40&page='+i+'&key=385f0044190e471aa3e65b5f36e4f71a'

        fetch(fetchPages)
        
        .then(function (response) {
                
            return response.json();
        })
        //return json response as data
        .then(function (data) {

        console.log(data)
        gameArray=gameArray.concat(data.results)
        
        console.log(gameArray)
        })
        
    }

        

    // var playerSearchURL = `https://api.rawg.io/api/tags/${playerArr}&key=`+key;

    // fetch(playerSearchURL)
    // .then(function (response) {
        
    //     return response.json();
    // })
    // //return json response as data
    // .then(function (data) {
    // console.log(data)
    //     for (var i=0; i < data.results.length; i++) {
    //       //dynamically create more elements here??  
    //     }
    //     return data;
    })
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

// notes

// genres -->
// racing:
// fetch('https://api.rawg.io/api/genres/1?key=385f0044190e471aa3e65b5f36e4f71a')
// shooter
// fetch('https://api.rawg.io/api/genres/2?key=385f0044190e471aa3e65b5f36e4f71a')
// adventure
// fetch('https://api.rawg.io/api/genres/3?key=385f0044190e471aa3e65b5f36e4f71a')
// action
// fetch('https://api.rawg.io/api/genres/4?key=385f0044190e471aa3e65b5f36e4f71a')
// rpg
// fetch('https://api.rawg.io/api/genres/5?key=385f0044190e471aa3e65b5f36e4f71a')
// fighting
// fetch('https://api.rawg.io/api/genres/6?key=385f0044190e471aa3e65b5f36e4f71a')

// tags -->
// singleplayer:
// fetch('https://api.rawg.io/api/tags/31?key=385f0044190e471aa3e65b5f36e4f71a')
// multiplayer:
// fetch('https://api.rawg.io/api/tags/7?key=385f0044190e471aa3e65b5f36e4f71a')

// platforms -->
// fetch('https://api.rawg.io/api/platforms/4?key=385f0044190e471aa3e65b5f36e4f71a')