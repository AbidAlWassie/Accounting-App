  function addRow() {
    // get input values
    var brand = document.getElementById("brand").value;
    var color = document.getElementById("color").value;
    var size = document.getElementById("size").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    
    // get the html table
    // 0 = the first table
    var table = document.getElementsByTagName("table")[0];
    
    // add new empty row to the table
    // 0 = in the top 
    // table.rows.length = the end
    // table.rows.length/2+1 = the center
    var newRow = table.insertRow(table.rows.length/2+1);
    
    // add cells to the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    
    // add values to the cells
    cell1.innerHTML = brand;
    cell2.innerHTML = color;
    cell3.innerHTML = size;
    cell4.innerHTML = price;
    cell5.innerHTML = quantity;
}