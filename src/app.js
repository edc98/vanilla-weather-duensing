function findCity(event) {
    event.preventDefault();
    let newCity = document.querySelector("#city-input");
    let apiKey = "7e2d6c3d38a855b033f6e213b1c9eca4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

let citySearch = document.querySelector("#search-engine");
citySearch.addEventListener("submit", findCity);

function displayWeather(response){
    let temp = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temper");
    temperatureElement.innerHTML = `${temp}`;

    let wind = response.data.wind.speed;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${wind} km/hr`;

    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
}