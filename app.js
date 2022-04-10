const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extented: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "7218d4ff99776cdba93e21254df11a07"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units=" + units
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        res.write("<p>The weather is currently "+ weatherDescription + "</p>")
        res.write("<h1> The temprature in "+query+" is "+ temp +" degree Celcius. </h1>");
        res.write("<img src=" +imageURL+">")
        res.send();
    })
  })
  console.log("Post request resived.")
})




app.listen(3000, function(){
  console.log("The server is running on port 3000")
})
