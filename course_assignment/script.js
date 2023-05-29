function populateTable(data, tableId, view, measurement) {
    const table = document.getElementById(tableId);

    // Clear the table, but preserve the header row
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    data.forEach((item, index) => {
      const row = table.insertRow(-1);
      row.insertCell(0).innerHTML = index + 1; // Add this line to set the row number


      if (view === "view-1") {
        row.insertCell(1).innerHTML = item.date_time.split("T")[0];
        row.insertCell(2).innerHTML = item.date_time.split("T")[1].split("Z")[0];
        row.insertCell(3).innerHTML = Object.keys(item.data)[0];
        row.insertCell(4).innerHTML = Object.values(item.data)[0];
      } else if (view === "view-2") {
        row.insertCell(1).innerHTML = item.date_time.split("T")[0];
        row.insertCell(2).innerHTML = item.date_time.split("T")[1].split("Z")[0];
        row.insertCell(3).innerHTML = item.temperature;
      } else if (view === "view-3") {
        row.insertCell(1).innerHTML = item.date_time.split("T")[0];
        row.insertCell(2).innerHTML = item.date_time.split("T")[1].split("Z")[0];
        row.insertCell(3).innerHTML = item.wind_speed;
      } else if (view === "view-5") {
        row.insertCell(1).innerHTML = item.date_time.split("T")[0];
        row.insertCell(2).innerHTML = item.date_time.split("T")[1].split("Z")[0];
        row.insertCell(3).innerHTML = item[measurement];
      }
    });
  }


  function createBarChart(canvasId, labels, data, label, backgroundColor) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  function createLineChart(canvasId, labels, data, title, backgroundColor, chartInstance) {
    const ctx = document.getElementById(canvasId).getContext("2d");

    return new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Measurements",
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: backgroundColor || "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return lineChart;
  }




  function fetchAndUpdateData(viewId, dataType, hours) {
    const url = hours === "now"
      ? `http://webapi19sa-1.course.tamk.cloud/v1/weather/${dataType}`
      : `http://webapi19sa-1.course.tamk.cloud/v1/weather/${dataType}/${hours}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (dataType === "temperature") {
          populateTable(data, "view-2-table", "view-2");
          const labels = data.map((item) => item.date_time);
          const values = data.map((item) => item.temperature);
          //createBarChart("view-2-chart", labels, values, "Temperature", "rgba(75, 192, 192, 0.5)");

          let chartInstance2 = Chart.getChart("view-2-chart");
        if (!chartInstance2) {
          chartInstance2 = createBarChart("view-2-chart", labels, values, "Temperature", "rgba(75, 192, 192, 0.5)");
        } else {
          chartInstance2.data.labels = labels;
          chartInstance2.data.datasets[0].data = values;
          chartInstance2.update();
        }
        } else if (dataType === "wind_speed") {
          populateTable(data, "view-3-table", "view-3");
          const labels = data.map((item) => item.date_time);
          const values = data.map((item) => item.wind_speed);
          //createBarChart("view-3-chart", labels, values, "Wind Speed", "rgba(255, 206, 86, 0.5)");

          let chartInstance3 = Chart.getChart("view-3-chart");
        if (!chartInstance3) {
          chartInstance3 = createBarChart("view-3-chart", labels, values, "Wind Speed", "rgba(255, 206, 86, 0.5)");
        } else {
          chartInstance3.data.labels = labels;
          chartInstance3.data.datasets[0].data = values;
          chartInstance3.update();
        }
        }
      });
  }


  function fetchAndUpdateCustomView(measurement, hours) {
    if(measurement !== "s-m"){
    const url = hours === "now"
      ? `http://webapi19sa-1.course.tamk.cloud/v1/weather/${measurement}`
      : `http://webapi19sa-1.course.tamk.cloud/v1/weather/${measurement}/${hours}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const tableId = "view-5-table";
        const view = "view-5";
        populateTable(data, tableId, view, measurement);


        const labels = data.map((item) => item.date_time);
        const values = data.map((item) => item[measurement]);

        // Get the existing chart instance, or create a new one if it doesn't exist
        let chartInstance = Chart.getChart("view-5-chart");
        if (!chartInstance) {
          chartInstance = createLineChart("view-5-chart", labels, values, measurement);
        } else {
          chartInstance.data.labels = labels;
          chartInstance.data.datasets[0].data = values;
          chartInstance.update();
        }

        const tableRows = document.querySelectorAll(`#${tableId} tr`);

        for (let i = 1; i < tableRows.length; i++) {
          const measurementType = tableRows[i].querySelectorAll("td")[3]?.innerText;
          const measurementValue = tableRows[i].querySelectorAll("td")[4];

          switch (measurementType) {
            case "temperature":
              measurementValue.innerText = data[i - 1]?.temperature;
              break;
            case "wind_speed":
              measurementValue.innerText = data[i - 1]?.wind_speed;
              break;
            case "wind_direction":
              measurementValue.innerText = data[i - 1]?.wind_direction;
              break;
            case "light":
              measurementValue.innerText = data[i - 1]?.light;
              break;
            case "rain":
              measurementValue.innerText = data[i - 1]?.rain;
              break;
            default:
              measurementValue.innerText = "N/A";
              break;
          }
        }
      })
      .catch((error) => {
        console.error(`Error fetching data for ${measurement} (${hours}):`, error);
      });
    }
  }


  // Set up navigation
  document.getElementById("view-1-btn").addEventListener("click", () => {
    showView("view-1");
  });

  document.getElementById("view-2-btn").addEventListener("click", () => {
    showView("view-2");
  });

  document.getElementById("view-3-btn").addEventListener("click", () => {
    showView("view-3");
  });

  document.getElementById("view-4-btn").addEventListener("click", () => {
    showView("view-4");
  });

  document.getElementById("view-5-btn").addEventListener("click", () => {
    showView("view-5");
  });

  document.getElementById("view-2-interval").addEventListener("change", (e) => {
    fetchAndUpdateData("view-2", "temperature", e.target.value);
  });

  document.getElementById("view-3-interval").addEventListener("change", (e) => {
    fetchAndUpdateData("view-3", "wind_speed", e.target.value);
  });

  document.getElementById("view-5-measurement").addEventListener("change", (e) => {
    const measurement = document.getElementById("view-5-measurement").value;
    const interval = document.getElementById("view-5-interval").value;
    fetchAndUpdateCustomView(measurement, interval);
  });

  document.getElementById("view-5-interval").addEventListener("change", (e) => {
    const measurement = document.getElementById("view-5-measurement").value;
    const interval = document.getElementById("view-5-interval").value;
    //const interval = e.target.value;
    fetchAndUpdateCustomView(measurement, interval);
  });


  const colorSelect = document.getElementById("color-select");

colorSelect.addEventListener("change", (event) => {
  const color = event.target.value;
  document.body.style.backgroundColor = color;
});


  function showView(viewId) {
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = view.id === viewId ? "block" : "none";
    });

    // Set default values for view-5 when switching to it
    if (viewId === "view-5") {
      document.getElementById("view-5-interval").value = "now";
      document.getElementById("view-5-measurement").value = "temperature";

      // Fetch and update data with default values
      fetchAndUpdateCustomView("temperature", "now");
    }
  }

  // Fetching and populating data for View 1 (30 latest measurements)
  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
    .then((response) => response.json())
    .then((data) => {
      const latestMeasurements = data.slice(0, 30).reverse();
      populateTable(latestMeasurements, "view-1-table", "view-1");
    });

    // Fetching and populating data for View 2 (20 latest temperature measurements)
    fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature")
    .then((response) => response.json())
    .then((data) => {
    populateTable(data, "view-2-table", "view-2");
    const labels = data.map((item) => item.date_time);
    const temperatures = data.map((item) => item.temperature);
    createBarChart("view-2-chart", labels, temperatures, "Temperature", "rgba(75, 192, 192, 0.5)");
    fetchAndUpdateData("view-2", "temperature", "now");
    });

    // Fetching and populating data for View 3 (20 latest wind speed measurements)
    fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed")
    .then((response) => response.json())
    .then((data) => {
    populateTable(data, "view-3-table", "view-3");
    const labels = data.map((item) => item.date_time);
    const windSpeeds = data.map((item) => item.wind_speed);
    createBarChart("view-3-chart", labels, windSpeeds, "Wind Speed", "rgba(255, 206, 86, 0.5)");
    fetchAndUpdateData("view-3", "wind_speed", "now");
    });



// Show default view
showView("view-1");