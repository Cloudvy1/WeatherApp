function test(){
    alert("Test");
}

const APIkey = "b1e9d16b7e33a4ea7f9ce803742f46a7";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?q="
function updateWeatherData(city){
    city = (city.replaceAll(' ', '').toLowerCase());  
    city = city.charAt(0).toUpperCase() + city.slice(1); //formatting city name
    fetch(`${APIurl}` + city + `&appid=${APIkey}` + `&units=metric`).then(response => response.json()).then(data => {
        if(data.cod === 200) {
            document.getElementById("city").innerHTML = city;

            let weatherIcon;
        switch(data.weather[0].main){
            case "Clear":
                weatherIcon = "clear.png";
                break;
            case "Clouds":
                weatherIcon = "clouds.png";
                break;
            case "Drizzle":
                weatherIcon = "drizzle.png";
                break;       
             case "Mist":
                weatherIcon = "mist.png";
                break;  
             case "Rain":
                weatherIcon = "rain.png";
                break;    
             case "Snow":
                weatherIcon = "snow.png";
                break;  
             case "Wind":
                weatherIcon = "wind.png";
                break;        
            default:
                weatherIcon = "clear.png";
        }
        console.log(weatherIcon)
        document.querySelector(".weather-icon").src = `images/${weatherIcon}`

        document.getElementById("degrees").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;      
        document.getElementById("windSpeed").innerHTML = `${Math.round((data.wind.speed)*3.6)} km/h`;      
        
        document.getElementById("hide").style.display = "block";

        console.log(data);
        }
        else alert("City doesn't exist")
        
    }).catch(err=>console.log(`error!!!!!!!!!!!!!!!!!! : ${err}`));
}

//Adding functionality to the searchbar
let searchbar = document.getElementById("searchBar");   
searchbar.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        try{
            updateWeatherData(e.target.value);
        }catch(err){
            console.log("NOT RIGHT CITY")
        }

        console.log(e);
    }
})

let searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener("click", ()=>{
    updateWeatherData(searchbar.value);
})