var myApi = "54448964d77673d05e876660501678d0";

var cityName = $("#city-name").val().trim();
var searchBtn = $(".search-button");

var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0";
var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0";

searchBtn.on("click", function(event){
    event.preventDefault();
    console.log("click");

    $.ajax({
        url: queryUrl,
        method: 'GET'
    })
        .then(function (response) {
            console.log(url);
            console.log(response)
        });





});