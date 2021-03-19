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
    const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
    const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
    
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


function addRow() {
  // get input values
  var brand = document.getElementById("brand").value;
  var name = document.getElementById("name").value;
  var color = document.getElementById("color").value;
  var size = document.getElementById("size").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  
  // get the html table
  // 0 = the first table
  var table = document.getElementsByTagName("table")[0];
  
  var newRow = table.insertRow(table.rows.length/2+1);
  
  // add cells to the row
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  
  // add values to the cells
  cell1.innerHTML = brand;
  cell2.innerHTML = name;
  cell3.innerHTML = color;
  cell4.innerHTML = size;
  cell5.innerHTML = price;
  cell6.innerHTML = quantity;
}

