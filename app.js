const { response } = require("express");
const express = require("express");
const https = require("https")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    const query=req.body.cityName;
    // console.log(req.body.cityName)
    const units="metric";
    const id =""
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units="+units,(response)=>{
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData.weather[0].description);
    
            const temp = weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon =weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn"+icon+"@2x.png"
            res.write("<h1>the temprature is "+ temp+" and its a "+description+" day</h1>")
            res.write("<img src="+imageURL+">")
            res.send()
        })
    });
})

app.listen(3000,()=>{
    console.log("han bhai 3000 kholo")
})
