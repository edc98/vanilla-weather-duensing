function findCity(event) {  //takes city from search bar and uses axios to find city
    event.preventDefault();
    let newCity = document.querySelector("#city-input");
    console.log(`${newCity.value}`);
    let apiKey = "7e2d6c3d38a855b033f6e213b1c9eca4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

let citySearch = document.querySelector("#search-engine");
citySearch.addEventListener("submit", findCity);

function displayWeather(response){  //takes data from axios related to the weather for the city searched
    let temp = Math.round(response.data.main.temp);
    console.log(`${temp}`);
    let temperatureElement = document.querySelector("#temper");
    temperatureElement.innerHTML = `${temp}`;

    let wind = response.data.wind.speed;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${wind} km/hr`;

    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

let now = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if(minutes<10){
    minutes = `0${minutes}`;
}

function localTime(){   //gets the time for the city searched
    let currentTime = document.querySelector("#local-time");
    currentTime.innerHTML = `${hours}:${minutes}`;
}

function currentDay() {  //gets day of the week for the city searched
    let currentDay = document.querySelector("#current-day");
    currentDay.innerHTML = `${day}`;
}

function replaceTitle(event) {  //replaces title of "New York" (default) with the city searched
  event.preventDefault();
  let location = document.querySelector("#location");
  let newLocation = document.querySelector("#city-input");
  location.innerHTML = `${newLocation.value}`;
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", replaceTitle);