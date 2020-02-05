myApi = "54448964d77673d05e876660501678d0";

queryUrl = "api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=" + myApi;
queryFiveDayUrl = "api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&APPID=" + myApi;

var cityId = $("#city-ID").val();
var searchBtn = $("#search-button");
