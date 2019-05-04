// const dotenv = require("dotenv").config();

// var keys = require("./keys.js");

// // var spotify = new Spotify(keys.spotify);

// // console.log(spotify);

// const spotifyID = dotenv.parsed.SPOTIFY_ID
// const spotifySecret = dotenv.parsed.SPOTIFY_SECRET

// console.log(spotifyID);

require("dotenv").config();

// Require keys.js file 
var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var fs = require("fs");


var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

if (process.argv[2] == 'concert-this' ) {
   
    var artist = process.argv.slice(3).join(" ")
    console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result  =  JSON.parse(body)[0];
        //console.log("Venue name " + result.venue.name);
        //console.log("Venue location " + result.venue.city);
        //console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
        console.log(response);
    });

    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")   
} else if ( process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");

    // if song is not given mercy will be default
if (songName === undefined) {
        songName = "Mercy";
    } 
   

     spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

            var tableArray = [];

            for (var i = 0; i < data.tracks.items.length; i++ ) {
                var result = {
                    artist : data.tracks.items[i].album.artists[0].name,
                    album_name : data.tracks.items[i].album.name,
                    song_name : data.tracks.items[i].name,
                    preview_url : data.tracks.items[i].preview_url 
                }
                tableArray.push(result);
            }
      
            
            
    
            console.log(tableArray);

       
    });


// if nothing provided will provide info for whats given below
} else if ( process.argv[2] == 'movie-this') {
    var movieName = process.argv.slice(3).join(" ");

    // if query that is passed in is undefined, lion king will be default
    if (movieName == undefined) {
        movieName = "The Lion King";
    } 
    
    // HTTP GET request

    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=79f0be52", function(error, response, body) {
        console.log(response);
        if (!error && response.statusCode === 200) {
          console.log("* Title of the movie:         " + JSON.parse(body).Title);
          console.log("* Year the movie came out:    " + JSON.parse(body).Year);
          console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
          console.log("* Country produced:           " + JSON.parse(body).Country);
          console.log("* Language of the movie:      " + JSON.parse(body).Language);
          console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
          console.log("* Actors in the movie:        " + JSON.parse(body).Actors);
  
          // for loop parses through ratings object to see if there is a rt rating
          // 	--> and if there is, will print
          for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
              if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                  console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
                  if(JSON.parse(body).Ratings[i].Website !== undefined) {
                      console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
                  }
              }
          }
        }
      });
    
// one of a kind baby!

} else if ( process.argv[2] == 'do-what-it-says') {
    console.log('Innana is one of a kind')
}
   
