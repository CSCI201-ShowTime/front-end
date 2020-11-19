const apiKey = '5f9aaccc5debb683b09516f40cefa44e';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weatherCallback2);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function weatherCallback2(position) {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + apiKey)
  //fetch('https://api.openweathermap.org/data/2.5/weather?lat=9&lon=18&appid=' + apiKey)
  .then(function(resp){
  return resp.json() //convert data to json
})
.then(function(data){
    console.log(data);
    drawWeather(data);
})
.catch(function(){
  console.log("Error with weatherCallback!");
});}
  /*
  .then(function(resp){
    let temp = resp.json();
    console.log(temp);
    drawWeather(temp);
    //console.log(resp.json())
    //drawWeather(resp.json());
    return resp.json() //convert data to json
  })
  .catch(function(){
    console.log("Error with weatherCallback!");
  });

}
function weatherCallback(latitude, longitude){
    //fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + apiKey)
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude+ '&lon=' + longitude + '&appid=' + apiKey)
    .then(function(resp){
      return resp.json() //convert data to json
    })
    .then(function(data){
      drawWeather(data);
    })
    .catch(function(){
      console.log("Error with weatherCallback!");
    });
}
function weatherBallon( cityID ) {
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		drawWeather(data);
	})
	.catch(function() {
		console.log("Something wrong with the weatherBallon function!");
	});
}
*/
function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  var description = d.weather[0].description;
  document.getElementById('hohoho').innerHTML = description;
  document.getElementById('hehehe').innerHTML = celcius + '&deg;';
  document.getElementById('reroro').innerHTML =  d.name;
  /*
	document.getElementById('description').innerHTML = description + " ";
	document.getElementById('temp').innerHTML = "Temperature: " + celcius + '&deg;' + " ";
	document.getElementById('location').innerHTML = "Current City: " + d.name + " ";
*/
  if( description.indexOf('rain') > 0 ) {
  	document.body.className = 'rainy';
  } else if( description.indexOf('cloud') > 0 ) {
  	document.body.className = 'cloudy';
  } else if( description.indexOf('sunny') > 0 ) {
  	document.body.className = 'sunny';
  } else {
  	document.body.className = 'clear';
  }
}
window.onload = function() {
  getLocation();
}
