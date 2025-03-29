const ctx = document.getElementById("myDonut").getContext("2d");

const data = {
  labels: ["Rent", "Food", "Transport", "Shopping", "Others"],
  datasets: [
    {
      label: "# of Votes",
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
      display: true,
      position: "bottom",
    },
  },
};

const config = {
  type: "doughnut",
  data: data,
  options: options,
};

new Chart(ctx, config);