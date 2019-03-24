require('dotenv').config({path: __dirname + '/.env'});
var Spotify = require('node-spotify-api');
const keys = require('./keys.js');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var Spotify = function () {

    this.Spotify = function spotifyThisSong(song){
        spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
            if(!error){
            for(var i = 0; i < data.tracks.items.length; i++){
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
            } else {
            console.log('Error occurred.');
            }
    
            fs.appendFile("log.txt", songData, function (err) {
                if (err) throw err;})
        });
    }
    
}

module.exports = Spotify;