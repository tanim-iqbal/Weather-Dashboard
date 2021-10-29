var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('searchBtn');
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
var city = 'Atlanta'
var lat = 33.7490
var long = 84.3880


function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=minutely&appid='+key;
  console.log (requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { 
        console.log (data.daily)
        //This is the forecast info for the 5 days
        for (let i = 0; i < 4; i++) {

        tempEl.textContent = "Temperature is "+data.daily[i].temp.day;
        windEl.textContent = "Wind speed is "+data.daily[i].wind_speed;
        humidEl.textContent = "Humidity is "+data.daily[i].humidity;

        tempEl1.textContent = "Temperature is "+data.daily[1].temp.day;
        windEl1.textContent = "Wind speed is "+data.daily[1].wind_speed;
        humidEl1.textContent = "Humidity is "+data.daily[1].humidity;
        
        tempEl2.textContent = "Temperature is "+data.daily[2].temp.day;
        windEl2.textContent = "Wind speed is "+data.daily[2].wind_speed;
        humidEl2.textContent = "Humidity is "+data.daily[2].humidity;
        
        tempEl3.textContent = "Temperature is "+data.daily[3].temp.day;
        windEl3.textContent = "Wind speed is "+data.daily[3].wind_speed;
        humidEl3.textContent = "Humidity is "+data.daily[3].humidity;

        tempEl4.textContent = "Temperature is "+data.daily[4].temp.day;
        windEl4.textContent = "Wind speed is "+data.daily[4].wind_speed;
        humidEl4.textContent = "Humidity is "+data.daily[4].humidity;
        }
    //   for (var i = 0; i < 4; i++) {
    //     var listItem = document.createElement('li');
    //     listItem.textContent = data[i].html_url;
    //     repoList.appendChild(listItem);
    //   }
    });
}

fetchButton.addEventListener('click', getApi);

// var todo = document.getElementById("cities");
// todo.addEventListener("click", function(event, cit) {
//   var element = event.target;
//    cit = element.textContent;

//   getApi(cit); //call the API send the city
// });