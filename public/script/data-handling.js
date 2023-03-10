import fetchWeather from "./api.js";

const capitalizeDesc = (desc) => {
  let splitStr = desc.split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

const convertToKmh = (speed) => {
  let kmh = speed * 3.6
  return Math.round(kmh * 10) / 10 
}

const getData = async(city) => {
  let weatherData = await fetchWeather(city);

  if (weatherData === 'city not found') {
    return weatherData;
  }

  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const conditionId = weatherData.weather[0].id;
  const condition = capitalizeDesc(weatherData.weather[0].description);
  const temp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const wind = convertToKmh(weatherData.wind.speed);
  
  const isDaytime = () => {
    if (weatherData.dt >= weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset) {
      return true;
    }
  
    return false;
  }
  

  return {
    cityName,
    country,
    conditionId,
    condition,
    temp,
    feelsLike,
    humidity,
    wind,
    isDaytime
  }
}

const convertToCelcius = (temp) => {
  let result = temp - 273.15;
  return Math.round(result);
}

const convertToFahrenheit = (temp) => {
  let result = (temp - 273.15) * 9 / 5 + 32;
  return Math.round(result);
}

export { getData, convertToCelcius, convertToFahrenheit };