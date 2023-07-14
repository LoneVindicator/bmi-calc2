const express = require('express'); //imports express
const fs = require('fs');
const path = require('path');
const app = express(); //names express as app
const port = 3000; //sets port number

app.set('views', 'views'); //tells express where the views are stored
app.set('view engine', 'hbs'); //tells express what view engine we're using
app.use(express.static('public')); //tells express which folder will be available to everyone

app.get('/', function (request, response) {

    response.render('home', {name: 'John Doe'}); //passes variable called name to home.hbs
});

app.use(express.json());

app.post('/', (req, res) => {
  const bmiData = req.body;

  // Define the file path where the JSON file will be saved
  const filePath = path.join(__dirname, 'public', 'data.json');

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(bmiData);

  // Write the JSON data to the file
  fs.writeFile(filePath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error saving JSON file:', err);
      res.sendStatus(500);
      return;
    }
    console.log('JSON file saved successfully!');
    res.sendStatus(200);
  });
});

app.listen(port);
console.log('server is listening on port 3000');