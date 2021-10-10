// grab elements with variables
var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('userimput');
var platform = document.getElementsByClassName("platformDropDown");
var players = document.getElementsByClassName('playerDropDown');
var genre = document.getElementsByClassName("genreDropDown");
var gameSection = document.getElementById("gamequery");
var key = "385f0044190e471aa3e65b5f36e4f71a";
var globalPlatform = [];
var globalPlayers = [];
var globalGenre = [];
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
            //     //append text box to page saying no results found
            // }
            // else {
                var cardElements =
               $(`<p>hello world</p>`)
            // gameSection.appendChild(cardElements)
            // }
            gameSection.append(cardElements);
            console.log(cardElements)
        }
        return data;
    })
};
// add event listener to main search button
search.addEventListener("click", function() {
    let user_input = document.getElementById("userinput")
    // console.log(user_input.value)
    let game = user_input.value
    searchGames(game);
});
//drop down event listeners:
// genre value function
function genreSelect() {
    globalGenre.push($('.genreDropDown :selected').text());
    console.log(globalGenre[0]);
}
function playerSelect() {
    if($('.playerDropDown :selected').text() === 'Singleplayer') {
        globalPlayers.push(31);
    }
    if ($('.playerDropDown :selected').text() === 'Multiplayer') {
        globalPlayers.push(7);
    }
    console.log(globalPlayers[0]);
}
function platformSelect() {
    globalPlatform.push($('.platformDropDown :selected').text());
    console.log(globalPlatform[0]);
}
function gameArrayFunction() {
    // console.log()
    let gameArray = [];
    let temp = [];
    // console.log('first')
    for (var i=1; i <= 4; i++) {
        var fetchPages = 'https://api.rawg.io/api/games?page_size=40&page='+i+'&key='+key
        // console.log('second')
        fetch(fetchPages)
        .then(function (response) {
            // console.log('third')
            return response.json();
        })
        //return json response as data
        .then(function (data) {
        // console.log('fourth')
         //console.log(data)
        gameArray = gameArray.concat(data.results)
        console.log(gameArray)
        console.log(arrayFunction(gameArray));
        temp.push(arrayFunction(gameArray))
        })
    }
    // console.log(temp[3][1])
}
gameArrayFunction();
function arrayFunction(filterArray) {
    // console.log('last hope')
            // var containsThisGenre = false;
        // for (let i = 0; i < game.genres.length; i ++) {
        //     if (game.genres[i].name === genreValue) {
        //         containsThisGenre = true;
        //     }
        // }
        // return containsThisGenre;
        // console.log(game.genres);
        // console.log(game.genres.map(g => g.name))
    if (globalGenre[0] !== null) {
        var userChoiceArr = filterArray.filter(game => game.genres.map(g => g.name).includes(globalGenre[0]))
        .filter(game => game.parent_platforms.map(g => g.platform.name).includes(globalPlatform[0]))
        .filter(game => game.tags.map(g => g.id).includes(globalPlayers[0]))
    }
    else {
        // console.log("hi")
    }
    // console.log("hello world")
    // console.log(userChoiceArr);
    return userChoiceArr;
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
//     //     return data;
//     })
// };
searchParameters.addEventListener('click', function() {
    genreSelect();
    playerSelect();
    platformSelect();
    gameArrayFunction();
})
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
// create function to append chosen values to search url
// function choosePlayer(value) {
//     let player1 = null;
//     let player2 = null;
//     let playerArr = [];
//     for( var i=0; i<value.length; i++) {
//         if (value[i] === 'singleplayer') {
//             player1 = '31' // tag id for singleplayer
//             console.log(player1)
//         }
//         if (value[i] === 'multiplayer') {
//             player2 = '7' // tag id for multiplayer
//             console.log(player2)
//         }
//     }
    // if (player1 !== null && player2 === null) {
    //     playerArr.push(player1)
    // }
    // if (player2 !== null && player1 === null) {
    //     playerArr.push(player2)
    // }
    // if (player1 !== null && player2 !== null) {
    //     let player3 = player1 + ',' + player2;
    //     playerArr.push(player3)
// }
//     createPlayerURL(playerArr);
// };