import { updateWeatherDisplay } from "./view_weather.js";

const weatherURL =
  "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-0179E027-7E79-4DBA-BCF1-1B91C0BF4A7E&locationName=&elementName=Wx";

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

async function fetchWeatherData() {
  const apiUrl = weatherURL;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    updateWeatherDisplay(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}
