var inquirer = require('inquirer');
require('dotenv').config()
var axios = require('axios');

var APIkey = '29bf935f0333f0acd4348bb2e8b14f11';

getLyrics();
var trackID;

function getLyrics() {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'song',
                message: 'What song would you like to Lennox Lyrics?'
            },
            {
                type: 'input',
                name: 'artist',
                message: 'Who is the artist of this song?'
            }
        ])
        .then(answers => {
            console.log(answers);
            var song = answers.song;
            var artist = answers.artist;

            var songsplit = song.split(" ").join('_');
            var artistsplit = artist.split(" ").join('_');

            trackIDGet(songsplit, artistsplit);
        });
}

function trackIDGet(song, artist) {

    axios.get("http://api.musixmatch.com/ws/1.1/track.search?q_track=" + song + "&q_artist=" + artist + "&page_size=1&page=1&s_track_rating=desc&apikey=" + APIkey)
    .then(function (response) {
            
            trackID = response.data.message.body.track_list[0].track.track_id;
            
            lyricsGet(trackID);
        });


}

function lyricsGet(id) {
    axios.get("http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + id + "&apikey=" + APIkey).then(
        function (response) {
            console.log(response.data.message.body.lyrics.lyrics_body);
            console.log('-----------------------------------------------------------------------\n');
            var preLyrics = response.data.message.body.lyrics.lyrics_body;
            lennox(preLyrics);
        }

    );
}

function lennox(lyrics){

var lennyLyrics = lyrics.replace(/\bi\b(?!')/gi, "Ty").replace(/\byou(?!')\b/gi, "Proulx").replace(/\bme\b/gi, "Weebs").replace(/girl/gi, "Merle").replace(/boy/gi, "Roy");
console.log('-----------------------------------------------------------------------\n');
console.log(lennyLyrics);
console.log('-----------------------------------------------------------------------\n');

}

