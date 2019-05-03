require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

// console.log(spotify);

const spotifyID = dotenv.parsed.SPOTIFY_ID
const spotifySecret = dotenv.parsed.SPOTIFY_SECRET

console.log(spotifyID);