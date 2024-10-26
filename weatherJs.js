function getWeather() {
  const apiKey = "Your API add";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const Url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });
  fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
      alert("Error fetching hourly forecast data. Please enter try again.");
    });
}
https: function displayWeather(data) {
  const tempInfo = document.getElementById("temp-div");
  const weatherInfo = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  weatherInfo.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml = `<p>${cityName}</p>
    <p>${description}</p>`;

    tempInfo.innerHTML = temperatureHTML;
    weatherInfo.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `<div class="hourly-item">
    <span>${hour}</span>
    <img src="${iconUrl}" alt="Hourly Weather Icon">
    <span>${temperature}</span>
    </div>`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}
function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
