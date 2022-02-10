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

function getForecast(coordinates){  //takes coordinates from displayWeather from api and sends them off to axios to be displayed in forecast function
    console.log(coordinates);
    let apiKey = `7e2d6c3d38a855b033f6e213b1c9eca4`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response){  //takes data from axios related to the weather for the city searched
    cTemp = Math.round(response.data.main.temp);
    console.log(response);
    let temperatureElement = document.querySelector("#temper");
    temperatureElement.innerHTML = `${cTemp}°`;

    let wind = response.data.wind.speed;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${wind} km/hr`;

    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let looking = response.data.weather[0].description;
    let lookingLikeElement = document.querySelector("#looking-like");
    lookingLikeElement.innerHTML = `${looking}`;

    console.log(response.data.weather[0].icon);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecast(response.data.coord);
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

localTime();
currentDay();

function replaceTitle(event) {  //replaces title of "New York" (default) with the city searched
  event.preventDefault();
  let location = document.querySelector("#location");
  let newLocation = document.querySelector("#city-input");
  location.innerHTML = `${newLocation.value}`;
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", replaceTitle);

function convertF(event){   //converts global variable cTemp that is taken from axios data to fahrenheit
    event.preventDefault();
    let temperatureElement = document.querySelector("#temper");
    let fTemp = Math.round((cTemp*9)/5+32);
    temperatureElement.innerHTML = `${fTemp}°`;
}

let cTemp = null;

let currentF = document.querySelector("#fahrenheit");
currentF.addEventListener("click", convertF);

function convertC(event){   //displays temp from global variable cTemp in celcius
    event.preventDefault();
    let temperatureElement = document.querySelector("#temper");
    temperatureElement.innerHTML = `${cTemp}°`;
}

let currentC = document.querySelector("#celcius");
currentC.addEventListener("click", convertC);

function formatDay(timestamp){  //converts date given from api into a readable date for user
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response){ //takes response from axios to get forecast for the next 5 days for a paticular location
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class = "row">`;
    
    forecast.forEach(function(forecastDay, index) {
        if(index<6){
            forecastHTML = forecastHTML + `
                <div class = "col-2">
                    <div class = "weather-forecast-date">
                        ${formatDay(forecastDay.dt)}
                    </div>
                    <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt = "" width = 36px />
                    <div class = "weather-forecast-temperature">
                        <span class = "weather-forecast-temp-max">
                            ${Math.round(forecastDay.temp.max)}°
                        </span> 
                        <span class = "weather-forecast-temp-min">
                            ${Math.round(forecastDay.temp.max)}°
                        </span>
                    </div>
                </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div`;
    forecastElement.innerHTML = forecastHTML;
}