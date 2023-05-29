
// TASK 7

const express = require('express');
const app = express();

const daysOfWeek7 = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6
};

app.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(daysOfWeek7));
});



//____________END of TASK 7_________________________________________________



//TASK 8

/*const daysOfWeek8 = {
  Monday: 10,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6
};*/


app.get('/html', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  let html = '<html><style>  table, th, td {    border: 1px solid black;    border-collapse: collapse;  }  th, td {    padding: 30px;  }  </style><head><title>Days of the Week</title></head><body><h2 style="color:SlateBlue;">Days of the Week</h2><table style="width:100% text-align:center;" ><colgroup><col span="1" style="background-color: #C0F8FF"><col span="1" style="background-color: #DFC0FF"></colgroup><tr><th>Day</th><th>Index</th></tr>';
  for (let day in daysOfWeek7) {
    html += `<tr><td>${day}</td><td>${daysOfWeek7[day]}</td></tr>`;
  }
  html += '</table></body></html>';
  res.send(html);
});

//____________END of TASK 8_________________________________________________



//TASK 9

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

app.get('/html/:dayIndex', (req, res) => {
  const dayIndex = req.params.dayIndex;
  const day = days[dayIndex];

  if (!day) {
    return res.status(404).send('Day not found');
  }

  const html = `
    <html>
      <style>
          table, th, td {    border: 1px solid black;    border-collapse: collapse;  }  th, td {    padding: 30px;  }
        </style>
      <head>
        <title>Day</title>
      </head>
      <body>
        <table>
          <tr>
            <th style= "font-size:22; color:SlateBlue;">Day</th>
            <th style= "font-size:22; color:SlateBlue;">Index</th>
          </tr>
          <tr>
            <td style= "font-size:16; color:Blue;">${day}</td>
            <td style= "font-size:16; color:Blue;">${dayIndex}</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  });

//____________END of TASK 9_________________________________________________