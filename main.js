$(function(){

  var localURL = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast/conditions/astronomy/q/autoip.json'
  var celsius = true;
  var current;
  
  function getForecast(url){
    $.getJSON(url, function(response){
      current = response.current_observation;
      inputCurrentData(current);
      checkSunUp(response.moon_phase);
      inputForecast(response.forecast.simpleforecast.forecastday);
    })
  };

  function  inputCurrentData(){
    $('#city').html(current.display_location.full);
    $('#temperature').html(current.temp_c);
    $('#feels-like-temperature').html(current.feelslike_c);
    $('#conditions').html(parseConditions(current.icon));
    $('#wind-speed-kph').html(current.wind_kph);
    $('#wind-gust-kph').html(current.wind_gust_kph);
    $('#wind-speed-mph').html(current.wind_mph);
    $('#wind-gust-mph').html(current.wind_gust_mph);
    $('#wind-direction').html(current.wind_dir);
    $('#humidity').html(current.relative_humidity);
  }

  function checkSunUp(sunTimes){
    var timeNow = new Date();
    var sunrise = new Date();
    var sunset = new Date();
    
    sunrise.setHours(sunTimes.sunrise.hour);
    sunrise.setMinutes(sunTimes.sunrise.minute);
    
    sunset.setHours(sunTimes.sunset.hour);
    sunset.setMinutes(sunTimes.sunset.minute);

    var sun = timeNow > sunrise && timeNow < sunset;  // Checking if sun is up or not (true or false) 
                                                      // to determine which icon and background to display.
    setIcon(current.icon, sun);
    setBackground(current.icon, sun);
  };

  $('#temperature-units').click(function changeUnits(){
    $('#celsius, #fahrenheit').toggleClass('alt-temperature');
    if ( celsius ){
      $('#temperature').html(current.temp_f);
      $('#feels-like-temperature').html(current.feelslike_f);
      $('#temperature-unit').html('F');
      celsius = false;
    } else {
      $('#temperature').html(current.temp_c);
      $('#feels-like-temperature').html(current.feelslike_c);
      $('#temperature-unit').html('C');
      celsius = true;
    }
  })

  getForecast(localURL);

});