import './App.css'
import { useState,useEffect } from 'react'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import {fetchWeatherByCity} from './utils/searchCity'
import backgrounds from './utils/backgrounds';
import soundEffects from './utils/soundEffects';


function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null)
  const [city, setCity] = useState('')
  const [background, setBackground] = useState('');
  const [currentSound, setCurrentSound] = useState(null);
  const [loading, setLoading] = useState(false);
  



  


  useEffect(() => {
    const success = (position) =>{
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }
  navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (coords) {

      const API_KEY= '66dcd42f879334c55bf13fafd143e7c4'

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios
        .get(url)
        .then((res)=>{
          setLoading(true);
          setWeather(res.data)
          const celsius =(res.data.main.temp-273.15).toFixed(1);
          const  fahrenheit = (celsius*9/5+32).toFixed(1);
          setTemp({celsius,fahrenheit});

          const now = new Date().getTime() / 1000;
          const isDay = now > res.data.sys.sunrise && now < res.data.sys.sunset;

          const weatherCondition = res.data.weather[0].main;
          setBackground(isDay ? backgrounds[weatherCondition].day : backgrounds[weatherCondition].night);


          // Detener el sonido actual antes de reproducir el nuevo
          if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
          }

          // Reproducir sonido según la condición climática
          const sound = soundEffects[weatherCondition];
          if (sound) {
            sound.play().catch(error => console.error(error));
            setCurrentSound(sound); // Establecer el sonido actual
          }
        })
        .catch((err)=>console.error(err))
        .finally(() => {
          setLoading(false); // Ocultar el loader
        });
    } 
  }, [coords]);


  const handleSearch = () => {
    if (city) {
      setLoading(true);
      fetchWeatherByCity(city)
        .then(({ weather, temp }) => {
          setWeather(weather);
          setTemp(temp);
          setCity('');

          // Determinar si es de día o de noche
          const now = new Date().getTime() / 1000;
          const isDay = now > weather.sys.sunrise && now < weather.sys.sunset;

          // Obtener la condición climática principal
          const weatherCondition = weather.weather[0].main;
          setBackground(isDay ? backgrounds[weatherCondition].day : backgrounds[weatherCondition].night);



          // Detener el sonido actual antes de reproducir el nuevo
          if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
          }

          // Reproducir sonido según la condición climática
          const sound = soundEffects[weatherCondition];
          if (sound) {
            sound.play().catch(error => console.error(error));
            setCurrentSound(sound); // Establecer el sonido actual
          }
      
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false); // Ocultar el loader
        });
    }
  };
 

 

  

  return (
    
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', color:'white'}}> 
    {loading && <Loader />}
   <div className='search'>
   <input 
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Buscar ciudad"
    />
      <button className='button' onClick={handleSearch} ><i className='bx bx-search-alt-2 bx-xs'></i></button>
   </div>
   
  
  
   
    <WeatherCard weather={weather} temp={temp}/>
    </div>
  )
}

export default App
