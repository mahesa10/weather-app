import getData from "./data-handling.js";

const city = document.querySelector('.city');
const condition = document.querySelector('.condition');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const notFound = document.querySelector('.not-found');

const resetDisplay = () => {
  city.innerText = '';
  condition.innerText = '';
  temperature.innerText = '';
  feelsLike.innerText = '';
  wind.innerText = '';
  humidity.innerText = '';

  notFound.className = 'not-found hidden';
}

const displayData = (weatherData) => {
  if (weatherData === 'city not found') {
    notFound.className = 'not-found';
    return;
  }

  city.innerText = `City: ${weatherData.cityName}`;
  condition.innerText = `Condition: ${weatherData.condition}`;
  temperature.innerText = `Temperature: ${weatherData.temp}`;
  feelsLike.innerText = `Feels Like: ${weatherData.feelsLike}`;
  wind.innerText = `Wind: ${weatherData.wind}`;
  humidity.innerText = `Humidity: ${weatherData.humidity}`;
}

const searchForm = document.querySelector('#search-form')
const inputCity = document.querySelector('#input-city');
const searchBtn = document.querySelector('#search-btn');

searchForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  if (inputCity.value === '') return;

  const weather = await getData(inputCity.value);
  resetDisplay();
  displayData(weather);
})