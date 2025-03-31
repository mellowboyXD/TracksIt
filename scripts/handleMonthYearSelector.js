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

yearSelectEl.onchange = function (e) {
  console.log(e.target.value);
};

monthSelectEl.onchange = function (e) {
  console.log(e.target.value);
};
