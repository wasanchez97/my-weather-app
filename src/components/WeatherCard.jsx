import { useState } from "react";
import './WeahterCard.css'

const WeatherCard = ({weather,temp}) => {
  const [isCelsius, setIsCelsius] = useState(true)
  const changeDedrees=()=>{
   setIsCelsius(!isCelsius); 
  }
 console.log(weather);
 return(
 <section className="weather-container" >
    <h1>Weather App</h1>
    <h2>
     {weather?.name},{weather?.sys.country}
      </h2>
      <article>
        <div>
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt= {weather?.weather[0].main} />  
        </div>
        <article>
            <h3>{weather?.weather[0].description}</h3>    
            <ul>
                <li>
                <span>Wind Speed<span></span>  {weather?.wind.speed}m/s</span>
                </li>
                <li>
                <span>Clouds<span></span>  {weather?.clouds.all}%</span>
                </li>
                <li>
                <span>Pressure<span></span>  {weather?.main.pressure}hPa</span>
                </li>  
            </ul>
        </article>
        <h2>
            {isCelsius ? `${temp?.celsius}°C` :`${temp?.fahrenheit}°F`}</h2>
        <button onClick={changeDedrees}>Change to {isCelsius ? '°F' : '°C'}</button>
      </article>

 </section>)
}

export default WeatherCard