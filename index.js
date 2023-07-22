const express = require('express'); //imports express
const app = express(); //names express as app
const port = 3000; //sets port number
const fs = require('fs');

app.set('views', 'views'); //tells express where the views are stored
app.set('view engine', 'hbs'); //tells express what view engine we're using
app.use(express.static('public')); //tells express which folder will be available to everyone

app.get('/', function (request, response) {

    response.render('home', {name: 'John Doe'}); //passes variable called name to home.hbs
});

// Function to save BMI data to the data.json file
function saveDataToFile(data, callback) {
  fs.readFile('data.json', 'utf8', (err, jsonString) => {

    if (err) {
      console.error('Error reading data.json:', err);
      return callback(err);
    }

    let existingData = [];
    if (jsonString) {
      existingData = JSON.parse(jsonString);

      
    }

    existingData.push(data);

    fs.writeFile('data.json', JSON.stringify(existingData), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to data.json:', err);
        return callback(err);
      }

      console.log('BMI data appended successfully!');
      // callback(null);
    });
  });
}

app.post('/', (req, res) => {
  const data = req.body;

  console.log(`data that's been passed in: ${JSON.stringify(req.body)}`)

  saveDataToFile(data, (err) => {
    if (err) {
      return res.status(500).send('Error saving BMI data.');
    }

    res.sendStatus(200);
  });
});


app.use(express.json());

app.listen(port);
console.log('server is listening on port 3000');