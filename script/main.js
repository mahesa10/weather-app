import fetchWeather from "./api.js";

const getData = async(city) => {
  let weatherData = await fetchWeather(city);

  if (weatherData === 'city not found') {
    return weatherData;
  }

  return {
    cityName: weatherData.name,
    country: weatherData.sys.country,
    condition: weatherData.weather[0].description,
    temp: weatherData.main.temp,
    feelsLike: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    wind: weatherData.wind.speed
  }
}

const displayWeather = async(city) => {
  let weather = await getData(city);

  if (weather === "city not found") {
    console.log(weather[0].toUpperCase() + weather.substr(1));
    return;
  }

  console.log(`City: ${weather.cityName}, Country: ${weather.country}, Condition: ${weather.condition}, Temperature: ${weather.temp}`)
}

displayWeather('jakarta');