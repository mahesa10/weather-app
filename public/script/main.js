import  { getData, convertToCelcius, convertToFahrenheit } from "./data-handling.js";

const wrapper = document.querySelector('#wrapper')
const city = document.querySelector('.city');
const condition = document.querySelector('.condition');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const windLabel = document.querySelector('.wind-label');
const wind = document.querySelector('.wind');
const humidityLabel = document.querySelector('.humidity-label');
const humidity = document.querySelector('.humidity');
const conditionIcon = document.querySelector('.condition-icon');

const notFound = document.querySelector('.not-found');

const weatherIcon = {
  clearSky: {
    day: './icons/clear-sky-day.svg',
    night: './icons/clear-sky-night.svg'
  },
  fewClouds: {
    day: './icons/partially-cloud-day.svg',
    night: './icons/partially-cloud-night.svg'
  },
  scatteredClouds: './icons/scattered-clouds.svg',
  brokenClouds: './icons/broken-clouds.svg',
  rain: './icons/rain.svg',
  thunderstorm: './icons/thunderstorm.svg',
  snow: './icons/snow.svg',
  mist: './icons/mist.svg'
}

const bgImages = {
  clearSky: {
    day: './bg-image/clear-day.jpg',
    night: './bg-image/clear-night.jpg'
  },
  clouds: {
    day: './bg-image/clouds.jpg',
    night: './bg-image/cloud-night.jpg'
  },
  rain: './bg-image/rain.jpg',
  thunderstorm: './bg-image/thunderstorm.jpg',
  mist: './bg-image/mist.jpg',
  snow: './bg-image/snow.jpg'
}

const getWeatherIcon = (weatherData) => {
  let iconSrc;
  let id = weatherData.conditionId;

  if (id >= 200 && id < 300) {
    iconSrc = weatherIcon.thunderstorm;
  } else if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) {
    iconSrc = weatherIcon.rain;
  } else if (id >= 600 && id < 700) {
    iconSrc = weatherIcon.snow;
  } else if (id >= 700 && id < 800) {
    iconSrc = weatherIcon.mist;
  } else if (id === 800) {
    if (weatherData.isDaytime()) {
      iconSrc = weatherIcon.clearSky.day;
    } else {
      iconSrc = weatherIcon.clearSky.night;
    }
  } else if (id === 801) {
    if (weatherData.isDaytime()) {
      iconSrc = weatherIcon.fewClouds.day;
    } else {
      iconSrc = weatherIcon.fewClouds.night;
    }
  } else if (id === 802) {
    iconSrc = weatherIcon.scatteredClouds;
  } else if (id === 803 || id === 804) {
    iconSrc = weatherIcon.brokenClouds;
  }

  return `<img src=${iconSrc}>`;
}

const getBgImage = (weatherData) => {
  let imageSrc
  let id = weatherData.conditionId;

  if (id >= 200 && id < 300) {
    imageSrc = bgImages.thunderstorm;
  } else if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) {
    imageSrc = bgImages.rain;
  } else if (id >= 600 && id < 700) {
    imageSrc = bgImages.snow;
  } else if (id >= 700 && id < 800) {
    imageSrc = bgImages.mist;
  } else if (id === 800) {
    if (weatherData.isDaytime()) {
      imageSrc = bgImages.clearSky.day;
    } else {
      imageSrc = bgImages.clearSky.night;
    }
  } else if (id === 801) {
    if (weatherData.isDaytime()) {
      imageSrc = bgImages.clearSky.day;
    } else {
      imageSrc = bgImages.clouds.night;
    }
  } else if (id >= 802 && id <= 804) {
    if (weatherData.isDaytime()) {
      imageSrc = bgImages.clouds.day;
    } else {
      imageSrc = bgImages.clouds.night;
    }
  }

  return `url(${imageSrc})`
}

const resetDisplay = () => {
  city.innerText = '';
  condition.innerText = '';
  temperature.innerText = '';
  feelsLike.innerText = '';
  wind.innerText = '';
  humidity.innerText = '';
  windLabel.classList.remove('hidden');
  humidityLabel.classList.remove('hidden');
  conditionIcon.classList.remove('hidden');

  notFound.classList.add('hidden');
}

const displayData = (weatherData) => {
  if (weatherData === 'city not found') {
    windLabel.classList.add('hidden');
    humidityLabel.classList.add('hidden');
    conditionIcon.classList.add('hidden');
    notFound.classList.remove('hidden');
    return;
  }

  wrapper.style.backgroundImage = getBgImage(weatherData);
  city.innerText = `${weatherData.cityName}, ${weatherData.country}`;
  condition.innerText = `${weatherData.condition}`;
  conditionIcon.innerHTML = getWeatherIcon(weatherData);
  temperature.innerHTML = `${convertToCelcius(weatherData.temp)}<span class="temp-scale text-3xl">&deg;C</span>`;
  feelsLike.innerHTML = `Feels Like ${convertToCelcius(weatherData.feelsLike)}&deg;`;
  wind.innerText = `${weatherData.wind} km/h`;
  humidity.innerText = `${weatherData.humidity}%`;
}

const searchForm = document.querySelector('#search-form')
const inputCity = document.querySelector('#input-city');

searchForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  if (inputCity.value === '') return;

  const weather = await getData(inputCity.value);
  resetDisplay();
  displayData(weather);
})

window.addEventListener('load', async() => {
  const defaultWeather = await getData('jakarta');
  displayData(defaultWeather);
})