// npm insta

// Dependencies and External resources
var Movie = require("./axios-calls/movie.js");

// Create a new Movie object
var movie = new Movie();

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
}


