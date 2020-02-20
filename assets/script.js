(function () {
    var NowMoment = moment().format('MMMM Do YYYY, h:mm a');
    var displayMoment = document.getElementById('currentDay');
    displayMoment.innerHTML = NowMoment;
})();




var myApi = "54448964d77673d05e876660501678d0";

var searchBtn = $(".search-button");

var city = [];

function renderCity(newcity) {
    city.push(newcity);
    $("#recent-search").empty();
    for (var i = 0; i < city.length; i++) {
        var newLi = $("<li>");
        newLi.addClass("list-group-item");
        newLi.attr("data-city", city[i]);
        newLi.text(city[i]);
        $("#recent-search").append(newLi);
    }
}


searchBtn.on("click", function (event) {
    event.preventDefault();

    var cityName = $("#city-name").val().trim();
    if (!cityName) return;

    $("#city-name").val("");
    var queryWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0&units=imperial";
    var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0&units=imperial";
    renderCity(cityName);

    $.ajax({
        url: queryWeatherUrl,
        method: 'GET'
    })
        .then(function (response) {
            $(".forecast").empty();

            var city = response.name;
            let weatherIcon = 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';

            var cityWeatherDiv = $("<div>").addClass("city-weather-div");

            var cityP = $("<h2>").text(city + " ");
            var wIcon = $('<img>').attr('src', weatherIcon).attr('alt', 'weather icon');
            cityP.append(wIcon);

            var tempP = $("<p>").text("Temperature: " + response.main.temp + " F");
            var humidP = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windP = $("<p>").text("Windspeed: " + response.wind.speed + " MPH");

            cityWeatherDiv.append(cityP, tempP, humidP, windP);
            $(".forecast").append(cityWeatherDiv);

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var queryCityUv = "https://api.openweathermap.org/data/2.5/uvi?&APPID=54448964d77673d05e876660501678d0&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: queryCityUv,
                method: 'GET'
            })
                .then(function (uvRes) {
                    var uvP = $("<p>").text("UV Index: " + uvRes.value);
                    $(".city-weather-div").append(uvP);
                })
        });

    $.ajax({
        url: queryFiveDayUrl,
        method: 'GET'
    })
        .then(function (res) {
            // console.log(queryWeatherUrl);
            // console.log(res);
            // console.log(res.list)
            $("#fiveday-div").empty();





            for (var i = 0; i < 5; i++) {
        
                var fiveDay = res.list;
                // console.log(res.list[i].weather[0].icon)
                var iconFor = 'https://openweathermap.org/img/wn/' + fiveDay[i].weather[0].icon + '.png';
    
    

                var fiveDayDiv = $("<div>").addClass('card text-white bg-primary mb-3 fiveday-card');
                var fiveDayDivBody = $("<div>").addClass('card-body');

                var fiveDayP = $("<h5>").text(fiveDay[i].dt_txt);
                var fiveIconImg = $('<img>').attr('src', iconFor);
                var fiveTempP = $("<p>").text("Temperature: " + fiveDay[i].main.temp + " F");
                var fiveHumidP = $("<p>").text("Humidity: " + fiveDay[i].main.humidity + "%");

                fiveDayDivBody.append(fiveDayP, fiveIconImg, fiveTempP, fiveHumidP);
                fiveDayDiv.append(fiveDayDivBody);
                $("#fiveday-div").append(fiveDayDiv);

            }


        });

});