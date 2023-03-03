import { useState, useEffect } from 'react';
import moment from 'moment'
function App(){
  const apiKey = import.meta.env.VITE_API_KEY
  const[data,setData] = useState([])
  const [date, setDate] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [weather, setWeather] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('../public/loading-3692_512.gif')
  const [sunrise, setSunrise] = useState(0) 
  const [sunset, setSunset] = useState(0) 
  const militaryHour = useState(String(date).substring(16,21))

  function refreshClock() {
    setDate(new Date());
   
  }


  async function getData() {
  
    //API CALL
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`)
    const responseData = await response.json() 
    setData(responseData)
    setWeather(data.main.temp)

    //CHECK SUNRISE AND SUNSET
    let timezone = data.timezone
    let sunrise = data.sys.sunrise
    let sunset = data.sys.sunset
    let x = moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm a');
    let y = moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm a');
    setSunrise(x)
    setSunset(String(y).substring(0,5))
    
    //CHECK THE WEATHER
    if(timeOfDay === 'day' && data.weather[0].main === 'Clouds') {
      setBackgroundImage('/mountain-5678172_1920.jpg')
    }
    if(timeOfDay === 'day' && data.weather[0].main === 'Fog') {
      setBackgroundImage('../public/hills-615429_1920.jpg')
    }
    if(timeOfDay === 'day' && data.weather[0].main === 'Snow') {
      setBackgroundImage('/mountain-5678172_1920.jpg')
    }
    if(timeOfDay === 'day' && data.weather[0].main === 'Clear') {
      setBackgroundImage('../public/tree-2916763_1920.jpg')
    }
    if(timeOfDay === 'day' && data.weather[0].main === 'Mist') {
      setBackgroundImage('halloween-770.gif')
    }
    if(timeOfDay === 'day' && data.weather[0].main === 'Rain') {
      setBackgroundImage('../public/rain-4194.gif')
    }
    if(timeOfDay === 'night') {
      setBackgroundImage('../public/northern-lights-1178_512.gif')
    }
    if(timeOfDay === 'night' && data.weather[0].main === 'Thunderstorm') {
      setBackgroundImage('../public/thunderstorm-1768742.jpg')
    }
  }
  
  useEffect(() => {
    const timerId = setInterval(refreshClock, 5000);
    return function cleanup() {
      clearInterval(timerId);
    };
    
  }, []);

  useEffect(() => {

   if(militaryHour >= sunrise && militaryHour <= sunset) {
      setTimeOfDay('day')
   } else {
    setTimeOfDay('night')
   }
   navigator.geolocation.getCurrentPosition(function(position) {
    setLat(Number(Number(position.coords.latitude).toFixed(4)))
    setLong(Number(Number(position.coords.longitude).toFixed(4)));
  })
  getData()
  }, [])

  
  
  
  return (
    <div id={timeOfDay} className='App'>
      <main style={{background:`url(${backgroundImage})`}} >
      <footer className='bottom-display'>
      <p className='time'>
      {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </p>
      <p className='weather'>
      {weather}F
      </p>
      </footer>
      </main>
    </div>
    
  );
}

export default App
