//Dates for travel

var startDate = moment().format("M/DD/YYYY");
var dayOne = moment().add(1, "days").format("M/DD/YYYY");
var dayTwo = moment().add(2, "days").format("M/DD/YYYY");
var dayThree = moment().add(3, "days").format("M/DD/YYYY");
var dayFour = moment().add(4, "days").format("M/DD/YYYY");
var dayFive = moment().add(5, "days").format("M/DD/YYYY");

$(document).ready(function () {
  console.log("Lets Go!");
  //onclick for enterting weather
  $("#basic-text1").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#input").val();
    var searchedCities = [];

    searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    searchedCities.push(cityInput);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

    appendWeather(cityInput);
  }); //end of on-click

  function appendWeather(cityInput) {
    //clears any previous data
    $("#dailyweather").empty();
    $("#fiveday").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    //Single day Query URL

    var singleDay =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&units=imperial" +
      "&appid=1e824d4a7dcd9d6f7f2ba26eeb8ab2f6";
    console.log("singleDay", singleDay);

    //Single Day AJAX Call
    $.ajax({
      url: singleDay,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var weatherIconURL =
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var temp = Math.floor(response.main.temp);
      var windSpeed = Math.floor(response.wind.speed);

      $("#dailyweather").append(
        "<div class='col s12 m6'>" +
          "<h2 class='daily'>" +
          response.name +
          " (" +
          startDate +
          ")" +
          "&nbsp" +
          "<img src='" +
          weatherIconURL +
          "'>" +
          "</h2>" +
          "<ul class='daily'>" +
          "Temperature: " +
          temp +
          " °F" +
          "</ul>" +
          "<ul class='daily'>" +
          "Humidity: " +
          response.main.humidity +
          "%" +
          "</ul>" +
          "<ul class='daily'>" +
          "Wind Speed: " +
          windSpeed +
          " MPH" +
          "</ul>" +
          "</div>"
      ); //end of append

      //Five Day Weather Variavke
      var fiveDay =
        "https://api.openweathermap.org/data/2.5/onecall?" +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=1e824d4a7dcd9d6f7f2ba26eeb8ab2f6";
      console.log("fiveDay", fiveDay);

      $.ajax({
        url: fiveDay,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var extTemp1 = Math.floor(response.daily[0].temp.day);
        var extTemp2 = Math.floor(response.daily[1].temp.day);
        var extTemp3 = Math.floor(response.daily[2].temp.day);
        var extTemp4 = Math.floor(response.daily[3].temp.day);
        var extTemp5 = Math.floor(response.daily[4].temp.day);

        //Weather icon URLS
        var iconURL1 =
          "http://openweathermap.org/img/w/" +
          response.daily[0].weather[0].icon +
          ".png";
        var iconURL2 =
          "http://openweathermap.org/img/w/" +
          response.daily[1].weather[0].icon +
          ".png";
        var iconURL3 =
          "http://openweathermap.org/img/w/" +
          response.daily[2].weather[0].icon +
          ".png";

        var iconURL4 =
          "http://openweathermap.org/img/w/" +
          response.daily[3].weather[0].icon +
          ".png";
        var iconURL5 =
          "http://openweathermap.org/img/w/" +
          response.daily[4].weather[0].icon +
          ".png";

        //UV Index AJAX Call and color else/if

        var uvIndexURL =
          "http://api.openweathermap.org/data/2.5/uvi?&appid=1e824d4a7dcd9d6f7f2ba26eeb8ab2f6&lat=" +
          lat +
          "&lon=" +
          lon;

        $.ajax({
          url: uvIndexURL,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          var uVIndex = Math.floor(response.value);

          $("#dailyweather").append(
            "<div class = 'col s12 m6'>" +
              "<button class= 'w3-button' id='uvIndex' class='daily'>" +
              " UV Index: " +
              uVIndex +
              "</button>" +
              "</div>"
          );

          if (uVIndex <= 2) {
            $("#uvIndex").addClass("green");
          } else if (uVIndex <= 5) {
            $("#uvIndex").addClass("yellow");
          } else if (uVIndex <= 8) {
            $("#uvIndex").addClass("orange");
          } else if (uVIndex <= 10) {
            $("#uvIndex").addClass("red");
          } else if (uVIndex <= 30) {
            $("#uvIndex").addClass("purple");
          }
        });

        //Extended Forcast Header

        $("#fiveday").append(
          "<div class='col-md-12>" +
            "<h2 id='fiveday'>" +
            "Extended Forcast:" +
            "</h2>"
        );

        //Extended Forcast Days
        $("#day1").append(
          "<div class='fiveDayCard card col s12 m6'>" +
            "<div class= 'card-body'>" +
            "<div class= 'card-header'>" +
            dayOne +
            "</div>" +
            "<div class ='card-text'>" +
            "<img src='" +
            iconURL1 +
            "'>" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Temp: " +
            extTemp1 +
            " °F" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Humidtiy: " +
            response.daily[0].humidity +
            "%" +
            "</div>" +
            "</div>"
        );

        $("#day2").append(
          "<div class='fiveDayCard card col s12 m6'>" +
            "<div class= 'card-body'>" +
            "<div class= 'card-header'>" +
            dayTwo +
            "</div>" +
            "<div class ='card-text'>" +
            "<img src='" +
            iconURL2 +
            "'>" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Temp: " +
            extTemp2 +
            " °F" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Humidtiy: " +
            response.daily[1].humidity +
            "%" +
            "</div>" +
            "</div>"
        );

        $("#day3").append(
          "<div class='fiveDayCard card col s12 m6'>" +
            "<div class= 'card-body'>" +
            "<div class= 'card-header'>" +
            dayThree +
            "</div>" +
            "<div class ='card-text'>" +
            "<img src='" +
            iconURL3 +
            "'>" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Temp: " +
            extTemp3 +
            " °F" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Humidtiy: " +
            response.daily[2].humidity +
            "%" +
            "</div>" +
            "</div>"
        );

        $("#day4").append(
          "<div class='fiveDayCard card col s12 m6'>" +
            "<div class= 'card-body'>" +
            "<div class= 'card-header'>" +
            dayFour +
            "</div>" +
            "<div class ='card-text'>" +
            "<img src='" +
            iconURL4 +
            "'>" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Temp: " +
            extTemp4 +
            " °F" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Humidtiy: " +
            response.daily[3].humidity +
            "%" +
            "</div>" +
            "</div>"
        );

        $("#day5").append(
          "<div class='fiveDayCard card col s12 m6'>" +
            "<div class= 'card-body'>" +
            "<div class= 'card-header'>" +
            dayFive +
            "</div>" +
            "<div class ='card-text'>" +
            "<img src='" +
            iconURL5 +
            "'>" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Temp: " +
            extTemp5 +
            " °F" +
            "</div>" +
            "<div class= 'card-text'>" +
            "Humidtiy: " +
            response.daily[4].humidity +
            "%" +
            "</div>" +
            "</div>"
        );

        showStoredCities();
      });
    }); // End of AJAX function
  } //End of appendWeather Function

  //function to show stored saved inputs
  function showStoredCities() {
    $("#citybuttons").empty();
    var arrFromStor = JSON.parse(localStorage.getItem("searchedCities")) || [];
    var arrLength = arrFromStor.length;

    //loop that will prepend all ciites within the array lenfth

    for (var i = 0; i < arrLength; i++) {
      var cityFromStor = arrFromStor[i];

      $("#citybuttons").prepend(
        "<div class='list-group'>" +
          "<button class= 'list-group-item'>" +
          cityFromStor +
          "</button>"
      );
    } //end of loop
  } //end of ShowStoredCities

  showStoredCities();

  //show cities on click
  $("#citybuttons").on("click", ".list-group-item", function (event) {
    event.preventDefault();
    var cityInput = $(this).text();
    appendWeather(cityInput);
  });
}); //end document ready function
