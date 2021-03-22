window.onload = () => {
  var rootStock = document.getElementById("root-stock");
  var listRequest = new XMLHttpRequest();
  listRequest.open("GET", "js/list.json");
  listRequest.onload = function () {
    var listData = JSON.parse(listRequest.responseText);
    renderHTML(listData);
    // console.log(listData);
  }
  listRequest.send();
  
  function renderHTML(data) {
    var htmlString = "";
    
    for (i = 0; i < data.length; i++) {
      htmlString +=
        "<tr>"
        + "<td>" + data[i].brand + "</td>"
        + "<td>" + data[i].name + "</td>"
        + "<td>" + data[i].color + "</td>"
        + "<td>" + data[i].size + "</td>"
        + "<td>" + data[i].price + "</td>"
        + "<td>" + data[i].quantity + "</td>" +
        "</tr>";
    }
    
    rootStock.insertAdjacentHTML("beforeend", htmlString);
    var table = document.getElementById("root-stock");
    result = 0;
    for(var i = 0; i < table.rows.length; i++) {
      result = result + parseInt(table.rows[i].cells[4].innerHTML) * parseInt(table.rows[i].cells[5].innerHTML);
    }
    document.getElementById("result").innerHTML = result;
    console.log(result);
  }
  // const totalCapital = document.getElementById("result-total");
  
}

/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  
  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
  
    if (!isNaN(parseFloat(aColText)) && !isNaN(parseFloat(bColText))) {
      aColText = parseFloat(aColText);
      bColText = parseFloat(bColText);
    }
  
    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });
  
  // Remove all existing TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }
  
  // Re-add the newly sorted rows
  tBody.append(...sortedRows);
  
  // Remember how the column is currently sorted
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    
    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});




// function addRow() {
//   // get input values
//   const brand = document.getElementById("brand").value;
//   const name = document.getElementById("name").value;
//   const color = document.getElementById("color").value;
//   const size = document.getElementById("size").value;
//   const price = document.getElementById("price").value;
//   const quantity = document.getElementById("quantity").value;
//
//   // get the html table
//   // 0 = the first table
//   const table = document.getElementsByTagName("table")[0];
//
//   const newRow = table.insertRow(table.rows.length/2+1);
//
//   // if (brand === name === color === size) {
//   //
//   // }
//
//   // add cells to the row
//   const cell1 = newRow.insertCell(0);
//   const cell2 = newRow.insertCell(1);
//   const cell3 = newRow.insertCell(2);
//   const cell4 = newRow.insertCell(3);
//   const cell5 = newRow.insertCell(4);
//   const cell6 = newRow.insertCell(5);
//
//   // add values to the cells
//   cell1.innerHTML = brand;
//   cell2.innerHTML = name;
//   cell3.innerHTML = color;
//   cell4.innerHTML = size;
//   cell5.innerHTML = price;
//   cell6.innerHTML = quantity;
// }

