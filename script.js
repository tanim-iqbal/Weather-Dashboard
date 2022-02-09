const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const cityEl = document.getElementById("city");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const fetchButton = document.getElementById("searchBtn");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-text");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thirsday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_Key = "90a759efbdc05d8004d62a39a8c185c9";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getCurrentWeatherData();
function getCurrentWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_Key}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function getApi(citySearch) {

  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+citySearch+'&appid=90a759efbdc05d8004d62a39a8c185c9&units=imperial&'
  console.log (requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.city.coord.lat
      console.log (lat)
      var lon = data.city.coord.lon
      var mainUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely&appid='+API_Key+'&units=imperial&';
      console.log (lon)
//---------------------------------------------------------------------------
  fetch(mainUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (forcastData) {

        showWeatherData(forcastData);
      })
    });
}
//Search function
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  console.log("Event Listener Working");

  var citySearch = todoInput.value.trim();
  // Return from function early if submitted todoText is blank
  if (citySearch === "") {
    return;
  }
  getApi(citySearch)
});

function showWeatherData(data) {
  let { humidity, wind_speed } = data.current;

  timezone.innerHTML = data.timezone;
  cityEl.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
  <div>Humidity</div>
  <div>${humidity}%</div>
</div>
<div class="weather-item">
  <div>Wind Speed</div>
  <div>${wind_speed}</div>
</div>`;

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${
      day.weather[0].icon
    }@4x.png" alt="weather icon" class="w-icon">
    <div class="others" id="other">
        <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
        <div class="temp">Day ${day.temp.day}&#176; F</div>
        <div class="temp">Night ${day.temp.night}&#176; F</div>
        
    </div>
    
    `;
    } else {
      otherDayForecast += `
    <div class="weather-forecast-item">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Day - ${day.temp.day}&#176; F</div>
                <div class="temp">Night - ${day.temp.night}&#176; F</div>
      </div>`;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}

//search by pressing enter
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var citySearch = todoInput.value.trim();
  // Return from function early if submitted todoText is blank
  if (citySearch === "") {
    return;
  }
  getApi(citySearch);
});
