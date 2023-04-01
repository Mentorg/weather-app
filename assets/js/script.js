function init () {
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  if (!input.value) {
    getWeather('London')
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather(input.value);
  })
}

async function getWeather(location) {
  const apiKey = '560684b9e4908cd9a25431f0263a7257';
  const unit = 'metric';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`, {mode: "cors"});
  const responseJSON = await response.json();
  displayData(responseJSON);
  changeBackground(responseJSON.weather[0].id);
}

function displayData(data) {
  document.getElementById('city').textContent = data.name;
  document.getElementById('country').textContent = data.sys.country;
  document.getElementById('weather-img').setAttribute('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
  document.getElementById('weather-description').textContent = data.weather[0].description;
  document.getElementById('weather-degree').innerHTML = data.main.temp + '<span>&#176;</span>';
  document.getElementById('weather-feel').innerHTML = data.main.feels_like + '<span>&#176;</span>';
  document.getElementById('temp-max').innerHTML = data.main.temp_max + '<span>&#176;</span>';
  document.getElementById('temp-min').innerHTML = data.main.temp_min + '<span>&#176;</span>';
  document.getElementById('sunrise-time').textContent = formatTime(data.sys.sunrise);
  document.getElementById('sunset-time').textContent = formatTime(data.sys.sunset);
  document.getElementById('humidity-level').innerHTML = data.main.humidity + '%';
  document.getElementById('pressure-level').innerHTML = data.main.pressure + ' hPa';
  document.getElementById('visibility-level').innerHTML = data.visibility + ' km/h';
  document.getElementById('wind-direction').innerHTML = data.wind.deg + '<span>&#176;</span>';
  document.getElementById('wind-speed').innerHTML = data.wind.speed + ' km/h';
}

function formatTime(time) {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return hours + ':' + minutes;
}

function changeBackground(weatherID) {
  const background = document.getElementById('body');

  if (weatherID >= 200 && weatherID <= 240) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/thunderstorm.jpg')";
  } else if (weatherID >= 300 && weatherID <= 340) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/drizzle.jpg')";
  } else if (weatherID >= 500 && weatherID <= 540) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/rain.jpg')";
  } else if (weatherID >= 600 && weatherID <= 640) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/snow.jpg')";
  } else if (weatherID >= 700 && weatherID <= 790) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/atmosphere.jpg')";
  } else if (weatherID == 800) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/clear.jpg')";
  } else if (weatherID >= 801 && weatherID <= 804) {
    background.style.backgroundImage = "url('../weather-app/assets/images/background/clouds.jpg')";
  }
}

init();