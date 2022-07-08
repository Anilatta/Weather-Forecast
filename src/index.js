let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[currentDate.getDay()];
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = currentDate.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[currentDate.getMonth()];

let date = document.querySelector("#dayTime");
date.innerHTML = `${day} ${hours}:${minutes}`;

let todayDate = document.querySelector("#todayDate");
todayDate.innerHTML = `${today}/${month}`;

function showData(response) {
  let temperature = Math.round(response.data.main.temp);
  celciusTemp = response.data.main.temp;

  let nowTemp = document.querySelector("#nowTemp");
  nowTemp.innerHTML = `${temperature}`;
  let outside = document.querySelector("#outside");
  outside.innerHTML = `${response.data.weather[0].main}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let air = document.querySelector("#air");
  air.innerHTML = `Sky: ${response.data.weather[0].description}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

function searchNewCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter");
  let newCity = document.querySelector("#citySearch");
  if (searchInput.value) {
    newCity.innerHTML = `${searchInput.value}`;
  } else {
    newCity.innerHTML = "😢";
  }
  let apiKey = "5cd2f71c0623efb5f800f92f1a7eaa5f";
  let cityN = `${searchInput.value}`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityN}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}
let city = document.querySelector("#search-form");
city.addEventListener("click", searchNewCity);

function showCurrentData(response) {
  let temperature = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#nowTemp");
  nowTemp.innerHTML = `${temperature}`;
  celciusTemp = response.data.main.temp;
  let outside = document.querySelector("#outside");
  outside.innerHTML = `${response.data.weather[0].main}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let air = document.querySelector("#air");
  air.innerHTML = `Description: ${response.data.weather[0].description}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let city = document.querySelector("#citySearch");
  city.innerHTML = `${response.data.name}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function showCurrentCity(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9583d26359a57772b18997e04cbea4af";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentData);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}

let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", getCurrentPosition);
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  celciustLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#nowTemp");
  temperatureElement.innerHTML = fahrenheitTemp;
}
function showCelciusTemp(event) {
  event.preventDefault();
  celciustLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#nowTemp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
let celciustLink = document.querySelector("#celcius-link");
celciustLink.addEventListener("click", showCelciusTemp);
let celciusTemp = null;
