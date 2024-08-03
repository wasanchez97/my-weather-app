import axios from 'axios';

const API_KEY = '66dcd42f879334c55bf13fafd143e7c4';

export const fetchWeatherByCity = async(cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  
  try {
    const res = await axios.get(url);
    const celsius = (res.data.main.temp - 273.15).toFixed(1);
    const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1);
    
    const sunrise = res.data.sys.sunrise * 1000;
    const sunset = res.data.sys.sunset * 1000;
    const currentTime = new Date().getTime();
    const isDay = currentTime > sunrise && currentTime < sunset;

    return {
      weather: res.data,
      temp: { celsius, fahrenheit },
      isDay
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
