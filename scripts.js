var search = document.getElementById('search');
var searchParameters = document.getElementById('searchgames');
var gameInput = document.getElementById('userimput');
var platform = document.getElementsByClassName("platformDropDown")[0];
var players = document.getElementsByClassName('playerDropDown')[0];
var genre = document.getElementsByClassName("genreDropDown")[0];
var gameSection = document.getElementById("gamequery");
var key = "385f0044190e471aa3e65b5f36e4f71a";
var globalPlatform = '';
var globalGenre = 'brokenCode';
var globalPlayers = 0;
var temp = [];


platform.addEventListener("change", function () {
    globalPlatform = $('.platformDropDown :selected').text();
    console.log(globalPlatform);
})

players.addEventListener("change", function(e) {
    globalPlayers = $('.playerDropDown :selected').text()
    console.log(globalPlayers);
})

genre.addEventListener("change", function(e) {
    globalGenre = $('.genreDropDown :selected').text()
    console.log(globalGenre);
})