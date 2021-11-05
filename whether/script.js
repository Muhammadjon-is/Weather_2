const dateElement  = document.getElementById("date");
const cityElement  = document.getElementById("city");
const descElement  = document.getElementById("description");
const iconElement  = document.getElementById("icon");
const tempElement  = document.querySelector(".temperature-value p");
const notification = document.getElementById("notification");
const clock = document.querySelector('.time');

function displayTime(){
    let date = new Date();
    let time = date.toLocaleDateString();

    clock.innerHTML = time;
}

let showTime = setInterval(displayTime);



const key = "a5ccbd68de38d5a7bcc55e5d630b60e5";

const KELVIN = 273;


// Weather Object
const weather = {};

weather.temperature = {
    unit: "celsius"
};


// Set user's position
const setPosition = position =>{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show an Error when it occurs
const errorHandler = error =>{
    showNotification(error.message);
}

// Get the location of the user
if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition, errorHandler);
}else{
    showNotification("Browser does not support Geolocation!!!");
} 






// Get Weather from API provider
const getWeather = (latitude, longitude) =>{
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


    fetch(api)
        .then(response=>{
            let data = response.json();
            return data;
        })
        .then(data=>{
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
}

// Display Weather
function displayWeather(){
    
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span> `;
    descElement.innerHTML = weather.description;
    cityElement.innerHTML = weather.city;
}



// Notification for Errors
const showNotification = val =>{
    const notif = document.createElement('div');
    notif.classList.add('toast');

    notif.innerHTML = val;

    notification.appendChild(notif);

    setTimeout(()=>{
        notif.remove();
    }, 3000);
};


// Converting calsius to fhranheit
fah.addEventListener("click", ()=>{
    const fah = weather.temperature.value + 10;
    tempElement.innerHTML = `${fah}°<span>&nbsp;&nbsp;C</span> <span>|</span> <span>F</span>`;
})

