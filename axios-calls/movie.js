var axios = require("axios");
var fs = require("fs");

// Store all of the arguments in an array
var Movie = function () {

    this.findMovie = function (movie) {
        var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        axios.get(URL).then(function (response) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data;

            // showData ends up being the string containing the show data we will print to the console
            var movieData = ["\n"+
                "Movie: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "Cast: " + jsonData.Actors,
                "Plot: " + jsonData.Plot,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "IMDB Rating: " + jsonData.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
            ].join("\n\n");

            console.log(movieData);

            fs.appendFile("log.txt", movieData, function (err) {
                if (err) throw err;


            });

        })

    }

}

module.exports = Movie;

