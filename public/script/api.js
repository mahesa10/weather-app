
const fetchWeather = async(location) => {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ac0a1ad411df28a2b97905ff8a76b56d`, { mode: 'cors' });
    console.log(response);
    
    if (!response.ok) {
      throw response.statusText;
    }
    
    let weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch(err) {
    return err;
  }
}

export default fetchWeather;