const ctx = document.getElementById("myDonut").getContext("2d");
const chartType = "pie";

Chart.register(ChartDataLabels);

const data = {
  labels: ["Rent", "Food", "Transport", "Shopping", "Others"],
  datasets: [
    {
      label: "$",
      data: [12, 19, 3, 5, 2],
      backgroundColor: ["red", "green", "orange", "purple", "blue"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
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
      color: "#f8f9fa",
      font: {
        size: 13,
        weight: "bold"
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