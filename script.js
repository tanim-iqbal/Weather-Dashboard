var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('searchBtn');
var todoForm = document.getElementById('todo-form')
var todoInput = document.getElementById('todo-text')
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidEl = document.getElementById('humidity');
var tempEl1 = document.getElementById('temp1');
var windEl1 = document.getElementById('wind1');
var humidEl1 = document.getElementById('humidity1');
var tempEl2 = document.getElementById('temp2');
var windEl2 = document.getElementById('wind2');
var humidEl2 = document.getElementById('humidity2');
var tempEl3 = document.getElementById('temp3');
var windEl3 = document.getElementById('wind3');
var humidEl3 = document.getElementById('humidity3');
var tempEl4 = document.getElementById('temp4');
var windEl4 = document.getElementById('wind4');
var humidEl4 = document.getElementById('humidity4');
var key = '90a759efbdc05d8004d62a39a8c185c9'
// var city = 'Atlanta'
// var lat = 33.7490
// var long = 84.3880

function getApi(citySearch) {

  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+citySearch+'&appid=90a759efbdc05d8004d62a39a8c185c9'
  console.log (requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { 
      var lat = data.city.coord.lat
      console.log (lat)
      var lon = data.city.coord.lon
      var mainUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely&appid='+key;
      console.log (lon)
//---------------------------------------------------------------------------
  fetch(mainUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (forcastData) { 
        

        console.log (forcastData)
        //This is the forecast info for the 5 days
            for (let i = 0; i < 4; i++) {

            tempEl.textContent = "Temperature is "+forcastData.daily[i].temp.day;
            windEl.textContent = "Wind speed is "+forcastData.daily[i].wind_speed;
            humidEl.textContent = "Humidity is "+forcastData.daily[i].humidity;

            tempEl1.textContent = "Temperature is "+forcastData.daily[1].temp.day;
            windEl1.textContent = "Wind speed is "+forcastData.daily[1].wind_speed;
            humidEl1.textContent = "Humidity is "+forcastData.daily[1].humidity;
            
            tempEl2.textContent = "Temperature is "+forcastData.daily[2].temp.day;
            windEl2.textContent = "Wind speed is "+forcastData.daily[2].wind_speed;
            humidEl2.textContent = "Humidity is "+forcastData.daily[2].humidity;
            
            tempEl3.textContent = "Temperature is "+forcastData.daily[3].temp.day;
            windEl3.textContent = "Wind speed is "+forcastData.daily[3].wind_speed;
            humidEl3.textContent = "Humidity is "+forcastData.daily[3].humidity;

            tempEl4.textContent = "Temperature is "+forcastData.daily[4].temp.day;
            windEl4.textContent = "Wind speed is "+forcastData.daily[4].wind_speed;
            humidEl4.textContent = "Humidity is "+forcastData.daily[4].humidity;
            }
      })
    });
}
// Add submit event to form
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var citySearch = todoInput.value.trim();
  // Return from function early if submitted todoText is blank
  if (citySearch === "") {
    return;
  }
  getApi(citySearch)
});

//Convertion from kelvin to fahrenheit
//var kel2far = ((forcastData.daily[i].temp.day-273.15)*1.8)+32
// console.log (kel2far)
