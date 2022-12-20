
const fetchWeather = async(location) => {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ac0a1ad411df28a2b97905ff8a76b56d`, { mode: 'cors' });
    // console.log(response);

    let weatherData = await response.json();
    
    if (!response.ok) {
      throw weatherData.message;
    }

    return weatherData;
  } catch(err) {
    return err;
  }
}

export default fetchWeather;