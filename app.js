let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

//! 1.1 To convert IN to India
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type: "region"}).of(code);
};

//! 2.1 to get the date and time
const getDateTime = (dt) => {

    const curDate = new Date(dt * 1000); // converting into milliseconds
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options).format(curDate);
    return formatter;
};

let city = "durgapur";  

//! Get city by search functionality
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();  //preventing bydefault behaviour of form submit 

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;

    getWeatherData();

    cityName.value = "";
});

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ddb8e118a2fa34780666d18e5431a0a3`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const {main, name, weather, wind, sys, dt} = data;
        
        //! 1. display city and country name
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        //! 2. display date and time
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        let temp = `${main.temp}` - 273;
        w_temperature.innerHTML = `${temp.toFixed()}&degC` ;
        
        let mintemp = `${main.temp_min}` - 273;
        w_minTem.innerHTML = `Min: ${mintemp.toFixed()}&degC`;

        let maxtemp = `${main.temp_max}` - 273;
        w_maxTem.innerHTML = `Max: ${maxtemp.toFixed()}&degC`;
        
        let feeltemp = `${main.temp_min}` - 273;
        w_feelslike.innerHTML = `${feeltemp.toFixed(1)}&deg`;

        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML =  `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;

    }

    catch (err) {
        console.log(err);
    }
}


document.body.addEventListener("load", getWeatherData());

