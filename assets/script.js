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
        newLi.addClass("list-group-item usedCities");
        newLi.attr("data-city", city[i]);
        newLi.text(city[i]);
        $("#recent-search").append(newLi);
    }
}

var cityHistory = [];

function saveToStorage() {
    let city = $("#city-name")
        .val()
        .trim();
    cityHistory.push(city);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    renderCity();
}

$(document).on("click", ".usedCities", function () {
    var value = $(this).text()
    $('.forecast').empty()
    console.log(value)
    getWeather(value)
    fiveDayForecast(value)
})

function getWeather(city) {
    var queryWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=54448964d77673d05e876660501678d0&units=imperial";

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
}

function fiveDayForecast(city) {
    var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=54448964d77673d05e876660501678d0&units=imperial";
    $.ajax({
        url: queryFiveDayUrl,
        method: 'GET'
    })
        .then(function (res) {
            $("#fiveday-div").empty();


            for (var i = 0; i < res.list.length; i++) {
                console.log(res.list);

                var fiveDay = res.list;
                if(fiveDay[i].dt_txt.includes('21:00:00')){
                    var iconFor = 'https://openweathermap.org/img/wn/' + fiveDay[i].weather[0].icon + '.png';

                    var fiveDayDiv = $("<div>").addClass('card text-white bg-primary mb-3 fiveday-card');
                    var fiveDayDivBody = $("<div>").addClass('card-body');
    
                    var fiveDayP = $("<h5>").text(moment(fiveDay[i].dt_txt).format('L'));
                    var fiveIconImg = $('<img>').attr('src', iconFor);
                    var fiveTempP = $("<p>").text("Temperature: " + fiveDay[i].main.temp + " F");
                    var fiveHumidP = $("<p>").text("Humidity: " + fiveDay[i].main.humidity + "%");
    
                    fiveDayDivBody.append(fiveDayP, fiveIconImg, fiveTempP, fiveHumidP);
                    fiveDayDiv.append(fiveDayDivBody);
                    $("#fiveday-div").append(fiveDayDiv);
                }
            }
        });
}


searchBtn.on("click", function (event) {
    event.preventDefault();
    saveToStorage();

    var cityName = $("#city-name").val().trim();
    if (!cityName) return;

    $("#city-name").val("");
    renderCity(cityName);
    getWeather(cityName);
    fiveDayForecast(cityName);

});
