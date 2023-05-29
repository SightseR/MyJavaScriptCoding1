var ctx = document.getElementById('myChart').getContext('2d');

var options = {
  scales: {
    yAxes: [{
      ticks: {
        fontSize: 14
      }
    }],
    xAxes: [{
      ticks: {
        fontSize: 14
      }
    }]
  }
};

var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Values',
            data: [8, 5, 4, 4, 3.5, 5],
            backgroundColor: 'navy',
            borderColor: 'navy',
            borderWidth: 2
        }]
    },
    options: options
});
