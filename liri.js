require('dotenv').config({ path: __dirname + '/.env' });
var Movie = require("./axios-calls/movie.js");
var Spotify = require('node-spotify-api');
const keys = require('./keys.js');
var request = require('request');
var moment = require('moment');
var fs = require("fs");

// Create a new Movie object
var movie = new Movie();

var spotify = new Spotify(keys.spotify);

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");

// Print whether searching for a show or actor, print the term as well
if (search === "movie-this") {
  console.log("Searching for movie....");
  movie.findMovie(term);
} else if (search === "spotify-this") {
  console.log("Searching for song....");
  spotifyThisSong(term);
} else if (search === "concert-this") {
  console.log("Searching for concerts....");
  concertThis(term);
} 
else if (search === "do-what-it-says") {
  console.log("Reading File....");
  doWhat(term);
} 

function spotifyThisSong(song) {
  spotify.search({ type: 'track', query: song, limit: 1 }, function (error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
      }

      var songEntry = [
        "Artist: " + songData.artists[0].name,
        "Song: " + songData.name,
        "Album: " + songData.album.name
      ]

      fs.appendFile("song-log.txt", JSON.stringify(songEntry), function (err) {
        if (err) throw err;
      })

    } else {
      console.log('Error occurred.');
    };

  });

}

function concertThis() {

    var queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body) {

      if (!error && response.statusCode === 200) {
    
        var JS = JSON.parse(body);
        for (i = 0; i < JS.length; i++)
        {
          var dTime = JS[i].datetime;
            var month = dTime.substring(5,7);
            var year = dTime.substring(0,4);
            var day = dTime.substring(8,10);
            var dateForm = month + "/" + day + "/" + year
      
          console.log("\n---------------------------------------------------\n");
    
            
          console.log("Date: " + dateForm);
          console.log("Name: " + JS[i].venue.name);
          console.log("City: " + JS[i].venue.city);
          if (JS[i].venue.region !== "")
          {
            console.log("Country: " + JS[i].venue.region);
          }
          console.log("Country: " + JS[i].venue.country);
          console.log("\n---------------------------------------------------\n");
    
        }
        fs.appendFile("song-log.txt", JSON.stringify(JS), function (err) {
          if (err) throw err;
        })
      }
    });
    }

    //Function for command do-what-it-says; reads and splits random.txt file
    //command: do-what-it-says
    function doWhat() {
      //Read random.txt file
      fs.readFile("random.txt", "utf8", function (error, data) {
          if (!error);
          console.log(data.toString());
          //split text with comma delimiter
          var cmds = data.toString().split(',');
      });
  }





