// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create a new Express application
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Open the MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define API endpoints
app.get('/items', (req, res) => {
  const query = 'SELECT name, info FROM owned_object ORDER BY name ASC, info ASC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    const items = results.map((row) => {
      return { name: row.name, info: row.info };
    });
    res.json(items);
  });
});

app.get('/acquisitions', (req, res) => {
  const query = 'SELECT person.name AS owner_name, owned_object.name AS item, owned_object.info ' +
                'FROM acquisition ' +
                'JOIN person ON acquisition.owner = person.id ' +
                'JOIN owned_object ON acquisition.item = owned_object.id';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    const acquisitions = results.map((row) => {
      return { owner_name: row.owner_name, item: row.item, info: row.info };
    });
    res.json(acquisitions);
  });
});

app.get('/latest4', (req, res) => {
  const query = 'SELECT person.name AS owner_name, owned_object.name AS item, owned_object.info ' +
                'FROM acquisition ' +
                'JOIN person ON acquisition.owner = person.id ' +
                'JOIN owned_object ON acquisition.item = owned_object.id ' +
                'ORDER BY acquisition_datetime DESC ' +
                'LIMIT 4';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    const acquisitions = results.map((row) => {
      return { owner_name: row.owner_name, item: row.item, info: row.info };
    });
    res.json(acquisitions);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
