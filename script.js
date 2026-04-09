const apiKey = "85c6c343bfdbf8bc367c960c529c8984"; 
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  weatherResult.innerHTML = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        const iconClass = getWeatherIcon(data.weather[0].main);
        weatherResult.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><i class="fas ${iconClass}"></i> ${data.weather[0].description}</p>
          <p>🌡 Temperature: ${data.main.temp} °C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;
      } else {
        weatherResult.innerHTML = `City not found: ${data.message}`;
      }
    })
    .catch(err => {
      weatherResult.innerHTML = "Error fetching weather data.";
      console.error(err);
    });
});

// Simple icon mapping
function getWeatherIcon(weather) {
  switch(weather.toLowerCase()){
    case "clouds": return "fa-cloud";
    case "rain": return "fa-cloud-showers-heavy";
    case "clear": return "fa-sun";
    case "snow": return "fa-snowflake";
    case "thunderstorm": return "fa-bolt";
    default: return "fa-cloud-sun";
  }
}