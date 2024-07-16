async function fetchRainData() {
  try {
    const response = await fetch(`/rain`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

let currentChart = null;

function getTaiwainRain() {
  document.addEventListener("DOMContentLoaded", async function () {
    let data = await fetchRainData();
    console.log(data);

    const taiwan = document.querySelector(".map");
    taiwan.addEventListener("click", (e) => {
      console.log(e.target.getAttribute("data-name"));
      if (e.target.getAttribute("data-name") === "keelung_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "基隆市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "基隆市");
      } else if (e.target.getAttribute("data-name") === "taipei_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "臺北市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "臺北市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "new_taipei_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "新北市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "新北市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "taoyuan_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "桃園市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "桃園市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "hsinchu_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "新竹縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "新竹縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "hsinchu_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "新竹市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "新竹市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "miaoli_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "苗栗縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "苗栗縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "taichung_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "臺中市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "臺中市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "changhua_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "彰化縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "彰化縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "nantou_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "南投縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "南投縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "yunlin_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "雲林縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "雲林縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "chiayi_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "嘉義縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "嘉義縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "chiayi_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "嘉義市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "嘉義市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "tainan_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "臺南市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "臺南市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "kaohsiung_city") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "高雄市"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "高雄市"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "pingtung_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "屏東縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "屏東縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "yilan_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "宜蘭縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "宜蘭縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "hualien_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "花蓮縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "花蓮縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "taitung_country") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "臺東縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "臺東縣"); // Call paintGraph with the filtered data
      } else if (
        e.target.getAttribute("data-name") === "penghu_country" ||
        e.target.getAttribute("data-name") === "path2476" ||
        e.target.getAttribute("data-name") === "path2474" ||
        e.target.getAttribute("data-name") === "path2492"
      ) {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "澎湖縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "澎湖縣"); // Call paintGraph with the filtered data
      } else if (
        e.target.getAttribute("data-name") === "path2651" ||
        e.target.getAttribute("data-name") === "path2643" ||
        e.target.getAttribute("data-name") === "path2645"
      ) {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "金門縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "金門縣"); // Call paintGraph with the filtered data
      } else if (
        e.target.getAttribute("data-name") === "path2679" ||
        e.target.getAttribute("data-name") === "path2675" ||
        e.target.getAttribute("data-name") === "path2673" ||
        e.target.getAttribute("data-name") === "path2671"
      ) {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "連江縣"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "連江縣"); // Call paintGraph with the filtered data
      } else if (e.target.getAttribute("data-name") === "path2527") {
        let graphData = data.data.filter(
          (city) => city["縣市名稱"] === "蘭嶼鄉"
        );
        let graphDataRain = [
          graphData[0]["降雨"]["過去24小時"],
          graphData[0]["降雨"]["過去24-48小時"],
          graphData[0]["降雨"]["過去48-72小時"],
        ];
        paintGraph(graphDataRain, "蘭嶼鄉"); // Call paintGraph with the filtered data
      }
    });
  });
}

getTaiwainRain();

function paintGraph(graphDataRain, city) {
  let ctx = document
    .getElementById("raining_content_data_graph")
    .getContext("2d");

  // Destroy the existing chart instance if it exists
  if (currentChart) {
    currentChart.destroy();
  }

  currentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["過去24小時", "過去24-48小時", "過去48-72小時"],
      datasets: [
        {
          label: `${city}降雨量`,
          data: graphDataRain,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
