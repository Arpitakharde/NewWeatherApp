const apiKey = "85c6c343bfdbf8bc367c960c529c8984"; // real key
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
    .then(response => response.json())
    .then(data => {
      console.log(data); // 👉 check API response in console
      if (data.cod === 200) {
        weatherResult.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
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