(function () {
    var NowMoment = moment().format('MMMM Do YYYY, h:mm a');
    var displayMoment = document.getElementById('currentDay');
    displayMoment.innerHTML = NowMoment;
})();




var myApi = "54448964d77673d05e876660501678d0";

var searchBtn = $(".search-button");

var city = [];

// var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0";

searchBtn.on("click", function (event) {
    event.preventDefault();

    var cityName = $("#city-name").val().trim();
    var queryWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0&units=imperial";
    var queryFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=54448964d77673d05e876660501678d0&units=imperial";
    var queryCityUv = "http://api.openweathermap.org/data/2.5/uvi/forecast?&APPID=54448964d77673d05e876660501678d0&units=imperial&lat={lat}&lon={lon}&cnt={cnt}";
    renderCity(cityName);

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




    $.ajax({
        url: queryWeatherUrl,
        method: 'GET'
    })
        .then(function (response) {
            $(".forecast").empty();
            console.log(queryWeatherUrl);
            console.log(response);
            
            console.log(response.coord.lon)
            console.log(response.coord.lat)

            console.log("City: " + response.name);
            console.log(response.weather[0].description);
            console.log("Temperature: " + response.main.temp + "F");
            console.log("Humidity: " + response.main.humidity + "%");
            console.log("Windspeed: " + response.wind.speed + "MPH");
            var city = response.name;

            var cityWeatherDiv = $("<div>");

            var cityP = $("<h2>").text(city + " ");
            cityP.append(response.weather[0].description);

            var tempP = $("<p>").text("Temperature: " + response.main.temp + " F");
            var humidP = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windP = $("<p>").text("Windspeed: " + response.wind.speed + " MPH");
            var uvP = $("<p>").text("UV Index: ");

            cityWeatherDiv.append(cityP, tempP, humidP, windP, uvP);
            $(".forecast").append(cityWeatherDiv);
        });

    $.ajax({
        url: queryFiveDayUrl,
        method: 'GET'
    })
        .then(function (response) {
            console.log(queryWeatherUrl);
            console.log(response);
            console.log(response.list)
            $("#fiveday-div").empty();


            var fiveDay = response.list;

            //console.log(fiveDay.dt_txt);



            for (var i = 0; i < 5; i++) {

                console.log(fiveDay[i].dt_txt);
                console.log(fiveDay[i].weather[0].description)
                console.log("Temp: " + fiveDay[i].main.temp + " F")
                console.log("Humidity: " + fiveDay[i].main.temp + "%")

                var fiveDayDiv = $("<div>");

                var fiveDayP = $("<h5>").text(fiveDay[i].dt_txt);
                var fiveIconImg = $("<p>").text(fiveDay[i].weather[0].description);
                var fiveTempP = $("<p>").text("Temperature: " + fiveDay[i].main.temp + " F");
                var fiveHumidP = $("<p>").text("Humidity: " + fiveDay[i].main.humidity + "%");

                fiveDayDiv.append(fiveDayP, fiveIconImg, fiveTempP, fiveHumidP);
                $("#fiveday-div").append(fiveDayDiv);

            }


        });

});