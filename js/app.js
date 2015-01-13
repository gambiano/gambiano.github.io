//Constants
var MAX_STORIES = 20;
var API = "2q2y7qrg";
var API_KEY = "a4ac9c9be6a053cbce8bbf8a61cbb880";
var SITE_ATTR = {"observer_detail": {
                    "tag": "Daily Observer",
                    "color": "#8ECE87",
                    "link": "http://observer.gm/"},
                 "foroyaa_detail": {
                    "tag": "Foroyaa",
                    "color": "#8479AE",
                    "link": "http://www.foroyaa.gm/"},
                 "thepoint_detail": {
                    "tag": "The Point",
                    "color": "#D46A6A",
                    "link": "http://thepoint.gm/"},
                 "freedom_detail": {
                    "tag": "Freedom",
                    "color": "#A059A0",
                    "link": "http://freedomnewspaper.com/"}
                };
var stories = [];

//process the data, when fetched
function dataReceived(data){
    if (data.count >= MAX_STORIES){
        var results = data.results.collection1;
        shuffle(results);
        for(i=0; i<MAX_STORIES; i++){
            stories.push({title: results[i].title,
                         body: results[i].body,
                          site: SITE_ATTR[results[i].api].tag,
                          color: SITE_ATTR[results[i].api].color,
                          link: SITE_ATTR[results[i].api].link
                         });
        }
    }
    console.log(results);
    console.log(stories);
    window.loading_screen.finish();
}


//Jquery ready, fetch data
$(function(){
    console.log($(".post-preview"));
    $.ajax({
        "url":"https://www.kimonolabs.com/api/" + API + "?apikey=" + API_KEY,
        "crossDomain":true,
        "dataType":"jsonp",

    })
    .done(function(data){
        dataReceived(data);
    })
    .fail(function(){
        console.log("error getting data"); //TODO: redirect to error page
        window.loading_screen.finish();
    });
});


//function for shuffling array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
