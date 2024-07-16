import { displayDefaultWeather, displaySelectWeather } from "./view_weather.js";

const weatherURL = "/api/weather";

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

async function fetchWeatherData() {
  const apiUrl = weatherURL;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      console.log(data);
      displayDefaultWeather(data);
      setupTimeSelectors(data);
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function setupTimeSelectors(data) {
  const selectors = document.querySelectorAll(".time_selector");
  selectors.forEach((selector, index) => {
    selector.addEventListener("click", () => displaySelectWeather(data, index));
  });
}
