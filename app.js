const apiKey = "d076b1ca4a84d003d4a6e5fabce97d3c"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

let inp = document.getElementById("search");
let btn = document.querySelector('.search button');

inp.addEventListener("keypress", (Event)=>{
    if(Event.key==="Enter"){
        btn.click();
    }
});
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
btn.addEventListener('click', ()=>{
    btn.style.boxShadow =  "0px 0px 10px";
    btn.style.transform = "scale(0.9)";
    btn.style.backgroundColor = "#d7d5d5";
    sleep(200).then(() => {
        btn.style.boxShadow =  "10px 10px 10px";
        btn.style.transform = "scale(1)";
        btn.style.backgroundColor = "#ebfffc";
    })
    console.dir(btn);
});

async function fetchData(city='Delhi'){
    let response = await fetch(apiUrl+"&appid="+apiKey+"&q="+city);
    let data = await response.json();
    return data;
}

function setData(){
    let city_searched = document.getElementById("search");
    if(!city_searched.value){
        city_searched.value="Delhi";
    }
    fetchData(city_searched.value.trim())
    .then((req,res)=>{
        let temp = document.getElementsByClassName("temp");
        let city = document.getElementsByClassName("city");
        let humidity = document.getElementsByClassName("humidity");
        let wind = document.getElementsByClassName("wind");
        
        
        // console.log(req.weather[0].icon);
        
        temp[0].innerText = Math.round(req.main.temp)+"°c";
        city[0].innerText = req.name;
        humidity[0].innerText = Math.round(req.main.humidity)+"%";
        wind[0].innerText = Math.round(req.wind.speed * 3.6)+"Km/h";
        
        setIcon(req.weather[0].icon);
        
    })
    .catch((err)=>{
        console.log("Error occure: "+err);
    });

}

function setIcon(icon){
    let we_icon = document.getElementsByClassName("weather-icon")[0];
    if(icon=="01d"){
        we_icon.src = "images/clear.png";
    }
    else if(icon=="02d" || icon==="50d" || icon==="50n"){
        we_icon.src = "images/few cloud.png";
    }
    else if(icon=="03d" || icon=="04d" || icon=="03n" || icon=="04n"){
        we_icon.src = "images/scattered clouds.png";
    }
    else if(icon=="09d" || icon=="09n"){
        we_icon.src = "images/shower rain.png";
    }
    else if(icon=="10d"){
        we_icon.src = "images/rain.png";
    }
    else if(icon=="11d" || icon=="11n"){
        we_icon.src = "images/thunderstorm.png";
    }
    else if(icon=="13d" || icon=="13n"){
        we_icon.src = "images/snow.png";
    }
    else{
        we_icon.src = "";
    }
}


setData();

let find = document.querySelector(".search button");
find.addEventListener('click',()=>{
    setData();
});
