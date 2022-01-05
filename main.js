const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile('/Users/kt/Documents/webdev/portfolio/Projects/Weather/index.html')
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = 'b31c5a2a1e69ecb1f18be581122ff129';
    const units = 'imperial';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;
    
    
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<p>The weather is currently ${description}.</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees</h1>`);
            res.write(`<img src='${imageURL}'>`)
            res.send();
        })
    })
})


app.listen(3000, function() {
    console.log('Server is running on port 3000.')
})
