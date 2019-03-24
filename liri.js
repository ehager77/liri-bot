require('dotenv').config({ path: __dirname + '/.env' });
var Movie = require("./axios-calls/movie.js");
var Spotify = require('node-spotify-api');
const keys = require('./keys.js');
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
} else {
  console.log("Error");
};

if (search === "spotify-this") {
  console.log("Searching for song....");
  spotifyThisSong(term);
} else {
  console.log("Error");
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

      var songEntry =[
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






