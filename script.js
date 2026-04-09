const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // <--- replace with your API key
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        weatherResult.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
      } else {
        weatherResult.innerHTML = `City not found.`;
      }
    })
    .catch(err => {
      weatherResult.innerHTML = "Error fetching weather data.";
      console.error(err);
    });
});