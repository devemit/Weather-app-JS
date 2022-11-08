const locationZone = document.querySelector('#location-timezone');
const temperatureDegree = document.querySelector('#temperature-degree');
const temperatureDescription = document.querySelector(
  '#temperature-description'
);
const windSpeed = document.querySelector('#wind-speed');
const humidityCheck = document.querySelector('#humidity');
const temperatureSection = document.querySelector('#temperature');
const temperatureSpan = document.querySelector('#temperature span');
const api = 'e1281b11b80c564423bcbb7cdac0d80e';
const search = document.querySelector('.inputValue');
const btn = document.querySelector('.button');

window.addEventListener('load', () => {
  btn.addEventListener('click', () => {
    const apifunc = async function () {
      try {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            search.value +
            '&appid=e1281b11b80c564423bcbb7cdac0d80e'
        );
        // Clear input field
        search.value = '';

        const data = await res.json();
        console.log(data, res);

        // Get data
        const { name, wind } = data;
        const { temp, humidity } = data.main;
        const [{ description }] = data.weather;

        // Formula from Kelvin to Fahrenheit
        let fahrenheit = ((temp - 273.15) * 9) / 5 + 32;

        // Formula Kelvin to Celsius
        let celsius = temp - 273.15;

        //  Set DOM Elements for the API
        temperatureDegree.textContent = `${Math.floor(celsius)}`;
        temperatureDescription.textContent = description.toUpperCase();
        locationZone.textContent = name;
        humidityCheck.textContent = `Humidity Level: ${humidity}%`;
        windSpeed.textContent = ` Wind Speed: ${wind.speed} m/s`;

        // Listener onclick change from C to F <--
        temperature.addEventListener('click', () => {
          if (temperatureSpan.textContent === '°C') {
            temperatureSpan.textContent = 'F';
            temperatureDegree.textContent = Math.floor(fahrenheit);
          } else {
            temperatureSpan.textContent = '°C';
            temperatureDegree.textContent = Math.floor(celsius);
          }
        });
      } catch {
        alert('City not found. Please search a valid city!');
      }
    };
    apifunc();
  });
});
