export function updateWeatherDisplay(data) {
  const weatherInfo = document.getElementById("weather_info");

  // 清空內容
  weatherInfo.textContent = "";

  data.data.forEach((city) => {
    city.forecast.forEach((forecast, index) => {
      // 時間區間
      const timeDiv = document.createElement("div");
      timeDiv.id = "weather_time_current";
      timeDiv.textContent = formatTimePeriod(
        data.forecast.timePeriod.start,
        data.forecast.timePeriod.end
      );

      // 地點
      const locationDiv = document.createElement("span");
      locationDiv.className = "info";
      locationDiv.textContent = data.location;
      weatherInfo.appendChild(locationDiv);

      // 判斷是否晚上
      const startTime = data.forecast.timePeriod.start.split(" ")[1];
      const iconSet = isNightTime(startTime)
        ? nightWeatherIcons
        : daylightWeatherIcons;

      // 天氣
      const iconImg = document.createElement("img");
      const iconPath =
        iconSet[data.forecast.weather] || "icon/no-status/cloud.png";
      iconImg.src = iconPath;
      iconImg.alt = data.forecast.weather;
      weatherInfo.appendChild(iconDiv);

      // 溫度
      const temperature = document.createElement("span");
      temperature.className = "info";
      temperature.textContent = ` ${forecast.temperature.min} ~ ${forecast.temperature.max} °C`;
      weatherInfo.appendChild(temperature);

      // // 下雨機率
      // const precipitationDiv = document.createElement("div");
      // precipitationDiv.className = "precipitation";
      // precipitationDiv.textContent = `${data.forecast.precipitationProbability}%`;
      // weatherInfo.appendChild(precipitationDiv);

      // 將時間區間添加到相對應的selector
      const timeSelectorId = ["first_time", "second_time", "third_time"][index];
      const timeSelector = document.getElementById(timeSelectorId);
      if (timeSelector) {
        timeSelector.appendChild(timeDiv);
      }
    });
  });
}

function isNightTime(time) {
  const hour = parseInt(time.substring(0, 2), 10);
  return hour >= 18 || hour < 6;
}

function formatTimePeriod(start, end) {
  // 分割日期與時間
  const startDateParts = start.split(" ");
  const endDateParts = end.split(" ");

  // 提取與格式化日期
  const startDateFormatted = startDateParts[0].substring(5).replace("-", "/");
  const endDateFormatted = endDateParts[0].substring(5).replace("-", "/");

  // 提取時間部分
  const startTime = startDateParts[1].substring(0, 5);
  const endTime = endDateParts[1].substring(0, 5);

  // 組合字串
  return `${startDateFormatted}-${startTime} ~ ${endDateFormatted}-${endTime}`;
}

const daylightWeatherIcons = {
  多雲短暫陣雨: "icon/daylight/daylight_cloud_rain.png",
  晴午後短暫雷陣雨: "icon/daylight/daylight_cloud_rain.png",
  晴時多雲: "icon/daylight/daylight_sun.png",
  多雲時晴: "icon/daylight/daylight_cloud.png",
  多雲時陰: "icon/no-status/cloud.png",
  多雲: "icon/no-status/cloud.png",
};

const nightWeatherIcons = {
  多雲短暫陣雨: "icon/night/night_cloud_rain.png",
  晴午後短暫雷陣雨: "icon/night/night_cloud_rain.png",
  晴時多雲: "icon/night/night.png",
  多雲時晴: "icon/night/night_cloud.png",
  多雲時陰: "icon/cloud.png",
  多雲: "icon/no-status/cloud.png",
};
