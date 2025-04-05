const ctx = document.getElementById("dashboard-chart").getContext("2d");
Chart.register(ChartDataLabels);

// User Configs
let chartType = "pie";
let chartLabels = ["Rent", "Food", "Transport", "Shopping", "Others"];
let dataItems = [12, 19, 3, 5, 2];
let colorPalette = ["red", "green", "orange", "purple", "blue"];
let borderWidth = 0.8
let showLegend = false;
let legendPosition = "bottom";
let dataLabelColor = "#f8f9fa";
let dataLabelFontSize = 13;
let dataLabelFontWeight = "bold";

const data = {
  labels: chartLabels,
  datasets: [
    {
      label: "$",
      data: dataItems,
      backgroundColor: colorPalette,
      borderWidth: borderWidth,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: showLegend,
      position: legendPosition,
    },
    tooltip: {
      enabled: true, 
    },
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map(data => {
          sum += data;
        });
        let percentage = (value * 100 / sum).toFixed(1) + "%";
        return percentage;
      },
      color: dataLabelColor,
      font: {
        size: dataLabelFontSize,
        weight: dataLabelFontWeight
      },
    },
  },
};

const config = {
  type: chartType,
  data: data,
  options: options,
  plugins: [ChartDataLabels],
};

new Chart(ctx, config);