(function () {
    var NowMoment = moment().format('MMMM Do YYYY, h:mm a');
    var displayMoment = document.getElementById('currentDay');
    displayMoment.innerHTML = NowMoment;
})();




var myApi = "54448964d77673d05e876660501678d0";

var searchBtn = $(".search-button");

// var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0";

searchBtn.on("click", function(event){
    event.preventDefault();
    console.log("click");

    var cityName = $("#city-name").val().trim();
    var queryWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0&units=imperial";
    var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0units=imperial";


    $.ajax({
        url: queryWeatherUrl,
        method: 'GET'
    })
        .then(function (response) {
            console.log(queryWeatherUrl);
            console.log(response)
        });





});