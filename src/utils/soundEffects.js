

const soundPaths = {
    Clear: '/sounds/ClearDay.mp3', 
  Clouds: '/sounds/clouds.mp3',
  Rain: '/sounds/rain.mp3',
  Snow: '/sounds/snow.mp3',
  Thunderstorm: '/sounds/thunderstorm.mp3',
  Drizzle: '/sounds/drizzle.mp3',
  Mist: '/sounds/misty.mp3',
  Fog: '/sounds/fog.mp3',
  Extreme: '/public/sounds/extreme.mp3', 
  Additional: '/public/sounds/additional.mp3' 

};
const soundEffects = {};
for (const [key, value] of Object.entries(soundPaths)) {
  soundEffects[key] = new Audio(value);
}


export default soundEffects;