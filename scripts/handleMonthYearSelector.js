import { chart, updateData } from "./dashboardChart.js";
import { getRangeFromDB } from "./db.js";
import { refreshTable } from "./table.js";

const yearSelectEl = document.getElementById("year-selector");
const monthSelectEl = document.getElementById("month-selector");
const monthOptionsEl = document.querySelectorAll("#month-selector option");

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const currYear = new Date().getFullYear();
const currMonth = months[new Date().getMonth()];

monthOptionsEl.forEach((opt) => {
  if (opt.value === currMonth) opt.selected = true;
});

for (let i = currYear - 5; i <= currYear; i++) {
  let opt = document.createElement("option");
  opt.value = i;
  opt.innerText = i;
  if (i === currYear) opt.selected = true;
  yearSelectEl.appendChild(opt);
}

yearSelectEl.onchange = async function (e) {
  const newDataValues = await getRangeFromDB(monthSelectEl.value, e.target.value);

  if(!window.location.href.includes("table")){
    const newData = updateData(newDataValues);
    chart.data.datasets[0].data = Object.values(newData);
    chart.update();
  } else if (window.location.href.includes('table')) {
    await refreshTable(newDataValues);
  }
};

monthSelectEl.onchange = async function (e) { 
  const dataValues = await getRangeFromDB(e.target.value, yearSelectEl.value);

  if(!window.location.href.includes("table")){
    const newData = updateData(dataValues);
    chart.data.datasets[0].data = Object.values(newData);
    chart.update();
  } else if (window.location.href.includes('table')) {
    await refreshTable(dataValues);
  }

};
