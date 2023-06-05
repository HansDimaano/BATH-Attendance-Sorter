// JAVASCRIPT FOR CONVERTING TEXT FILE TO TABLE

var readFile = function (event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function () {
      var text = reader.result;
      text = text.replace(/-/g, "");

      var rows = text.split("\n");

      var table = document.createElement("table");
      var headerRow = document.createElement("tr");

      var headers = rows[0].split(/\s+/);
      for (var i = 0; i < headers.length; i++) {
          if (i !== headers.length - 1) {
              // Skip the last column
              var headerCell = document.createElement("th");
              headers[i] = headers[i].replace("_", " ");
              headerCell.textContent = headers[i];
              headerRow.appendChild(headerCell);
          }
      }
      table.appendChild(headerRow);

      var attendanceData = {};

      for (var j = 1; j < rows.length; j++) {
          var rowData = rows[j].split(/\s+/);
          if (rowData.length > 1) {
              var row = document.createElement("tr");
              for (var k = 0; k < rowData.length; k++) {
                  if (k !== rowData.length - 1) {
                      // Skip the last column
                      var cell = document.createElement("td");
                      rowData[k] = rowData[k].replace("_", " ");
                      rowData[k] = rowData[k].replace("/", " ");
                      cell.textContent = rowData[k];
                      row.appendChild(cell);

                      if (k === 0) {
                          var name = rowData[k];
                          if (attendanceData[name]) {
                              attendanceData[name]++;
                          } else {
                              attendanceData[name] = 1;
                          }
                      }
                  }
              }
              table.appendChild(row);
          }
      }

      var outputNode = document.getElementById("output");
      outputNode.innerHTML = "";

      for (var name in attendanceData) {
          var nameRow = document.createElement("tr");
          var nameCell = document.createElement("td");
          nameCell.textContent = name;
          nameRow.appendChild(nameCell);

          var countCell = document.createElement("td");
          countCell.textContent = attendanceData[name] / 2;
          nameRow.appendChild(countCell);

          var attendanceTextCell = document.createElement("td");
          attendanceTextCell.textContent = "<- Student Total Attendance";
          nameRow.appendChild(attendanceTextCell);

          table.appendChild(nameRow);
      }

      var totalAttendanceRow = document.createElement("tr");
      var totalAttendanceHeader = document.createElement("th");
      totalAttendanceHeader.textContent = "Total Attendance";
      totalAttendanceRow.appendChild(totalAttendanceHeader);

      var totalAttendanceCell = document.createElement("td");
      totalAttendanceCell.textContent = (rows.length - 1) / 2;
      totalAttendanceRow.appendChild(totalAttendanceCell);

      table.appendChild(totalAttendanceRow);

      outputNode.appendChild(table);
  };

  reader.readAsText(input.files[0]);
};