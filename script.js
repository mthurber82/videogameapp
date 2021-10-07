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
fetch("https://api.rawg.io/api/games?search=vampire-the-masquerade-bloodlines-2&key=" + APIKey)
    .then(function (response) {
        
        
        return response.json();
        
      
    })
    .then(function (data) {
        console.log(data)
        return data;
    })