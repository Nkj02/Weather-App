import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// const https = require("https");
 import https from "https";
// import bodyParser from body-parser;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");

});

  app.post("/", function(req,res){
     const query = req.body.cityName;
     const apikey = "b325d06c82d35297df401cdc1a002365";
     const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
    https.get(url, function(response){
        console.log(response.statusCode);
    
       response.on("data", function(data){
         const weatherData = JSON.parse(data);
         console.log(weatherData);
          temp.innerHTML = weatherData.main.temp;
          temp_min.innerHTML = weatherData.main.temp_min;
          temp_max.innerHTML = weatherData.main.temp_max;
          pressure.innerHTML = weatherData.main.pressure;
          humidity.innerHTML = weatherData.main.humidity;
          weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imagrURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>"+weatherDescription+"</p>");
        res.write("<h1>The temperature in "+ query +" is "+temp+" degrees Celcius.</h1>");
        res.write("<img src="+imagrURL+ ">");
       
        res.send();
       //https://openweathermap.org/img/wn/10d@2x.png
    })
    })
    
  });

//  submit.eventListner


  





// app.post("/", function(req,res){

    


// });


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
