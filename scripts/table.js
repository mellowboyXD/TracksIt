import { updateOnlineStatus } from "./core.js";
import { getAllFromDB, getRangeFromDB } from "./db.js";

const yearSelectEl = document.getElementById("year-selector");
const monthSelectEl = document.getElementById("month-selector");

export async function refreshTable(data) {
  if(!data) {
    data = await getRangeFromDB();
  }
  
  if (window.location.href.includes("table")) {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    try {
      // const res = await getAllFromDB();
      const res = data;
      let count = 0;
      let sum = 0;
      res.forEach((row) => {
        // display
        sum += parseFloat(row.amount);
        const data = `
                <tr data-bs-toggle="modal" data-bs-target="#editModal" class="row-data">
                    <th scope="row">${++count}</th>
                    <td class="hidden-cell">${row.id}</td>
                    <td>${row.description}</td>
                    <td>${row.category}</td>
                    <td>${row.date}</td>
                    <td>${row.amount}</td>
                </tr>
            `;
        tableBody.innerHTML += data;
      });

      const sumEl = document.getElementById("sum-total");
      sumEl.innerText = "$" + sum.toFixed(2);
    } catch (err) {
      console.error("Error getting data. ", err);
      return false;
    }
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await refreshTable();
  await updateOnlineStatus();
});

setInterval(updateOnlineStatus, 10000);