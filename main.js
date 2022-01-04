const express = require('express');
const https = require('https');

const app = express();

app.get("/", function(req, res) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&appid=b31c5a2a1e69ecb1f18be581122ff129&units=imperial'
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<p>The weather is currently ${description}.</p>`);
            res.write(`<h1>The temperature in San Francisco is ${temp} degrees</h1>`);
            res.write(`<img src='${imageURL}'>`)
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log('Server is running on port 3000.')
})

// OpenWeather Info //
const apiKey = 'b31c5a2a1e69ecb1f18be581122ff129';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/'
