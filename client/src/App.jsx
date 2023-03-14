import { useState, useEffect } from 'react';
import moment from 'moment'
import Loader from './components/Loader';
import WeatherData from './components/WeatherData';
function App(){

  const apiKey = import.meta.env.VITE_API_KEY
  
  //STATES
  const[data,setData] = useState({})
  const [date, setDate] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState('');
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [weather, setWeather] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('')
  const [sunrise, setSunrise] = useState(0) 
  const [sunset, setSunset] = useState(0) 
  const [militaryHour, setMilitaryHour] = useState('')
  const [quoteData, setQuoteData] = useState(null)
  const [open, setOpen] = useState(true)
  
  //KEEP TRACK OF TIME
  function refreshClock() {
    setDate(new Date());
    setMilitaryHour(String(new Date()).substring(16,21))
  }
 //GETS COORDINATES TO BE PLACED INSIDE API CALL 
 function getCoordinates() {
  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(Number(Number(position.coords.latitude).toFixed(4)))
    setLong(Number(Number(position.coords.longitude).toFixed(4)));
  }) 
 }
 

  async function getData(lat, long) {
    //API CALL
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`)
    const responseData = await response.json() 
    
    //ONLY SETS IF VALID COORDINATES
    if (lat && long) {
      setData(responseData)
      setWeather(responseData.main.temp)
      //CONVERTING TIME FORMAT
      let timezone = responseData.timezone
      let sunrise = responseData.sys.sunrise
      let sunset = responseData.sys.sunset
      let x = moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm a');
      let y = moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm a');
      setSunrise(String(x).substring(0,5))
      setSunset(String(y).substring(0,5))
    } 
}
//SCREEN RENDERING PROCESS
  useEffect( () => {
    //GET THE CLOCK
    const timerId =  setInterval(refreshClock, 5000);
    //FETCH COORDS
    getCoordinates()
    //IF NO WEATHER DATA EXISTS
      if(weather === 0) {  
        setTimeout(() => {
          getData(lat, long)
        }, 3000);
    //IF IT DOES
      } else  {
        //KEEP TRACK OF LOCATION
        // getCoordinates()
        // setWeather(data.main.temp)

        //PICTURE RENDERS BASED ON SUNRISE OR SUNSET
        if(militaryHour > sunrise && militaryHour < sunset) {
          setTimeOfDay('day')
       } else {
        setTimeOfDay('night')
       }

       //POSSIBLE IMAGES
       if(timeOfDay === 'day' && data.weather[0].main === 'Clouds') {
        setBackgroundImage('/mountain-5678172_1920.jpg')
      }
      if(timeOfDay === 'day' && data.weather[0].main === 'Fog') {
        setBackgroundImage('/hills-615429_1920.jpg')
      }
      if(timeOfDay === 'day' && data.weather[0].main === 'Snow') {
        setBackgroundImage('/snow-682.gif')
      }
      if(timeOfDay === 'day' && data.weather[0].main === 'Clear') {
       setBackgroundImage('/tree-2916763_1920.jpg')
      }
      if(timeOfDay === 'day' && data.weather[0].main === 'Mist') {
        setBackgroundImage('/halloween-770.gif')
      }
      if(timeOfDay === 'day' && data.weather[0].main === 'Rain') {
        setBackgroundImage('/rain-4194.gif')
      }
      if(timeOfDay === 'night' && data.weather[0].main === 'Clear') {
        setBackgroundImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c2b4cc2-d07d-4fbd-b02e-2080981b29a1/d9brh0e-222e4a89-b0bf-46c6-be81-7c399828e98d.jpg/v1/fill/w_1134,h_705,q_70,strp/dying_star_by_t1na_d9brh0e-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Nzk2IiwicGF0aCI6IlwvZlwvMGMyYjRjYzItZDA3ZC00ZmJkLWIwMmUtMjA4MDk4MWIyOWExXC9kOWJyaDBlLTIyMmU0YTg5LWIwYmYtNDZjNi1iZTgxLTdjMzk5ODI4ZTk4ZC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.2SDPPxeMZkyaowDx_-VWo2JakIucK1Me3K2DJ9ka8jk')
      }
      if(timeOfDay === 'night' && data.weather[0].main === 'Fog' || data.weather[0].main === 'Mist') {
        setBackgroundImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ea77884b-194b-46e1-afa2-d5c4e2e80891/d9lxj2v-e6c40cb4-f078-499e-8a81-a0684ab57233.jpg/v1/fill/w_1024,h_683,q_75,strp/forest_at_night_by_darkoantolkovic_d9lxj2v-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgzIiwicGF0aCI6IlwvZlwvZWE3Nzg4NGItMTk0Yi00NmUxLWFmYTItZDVjNGUyZTgwODkxXC9kOWx4ajJ2LWU2YzQwY2I0LWYwNzgtNDk5ZS04YTgxLWEwNjg0YWI1NzIzMy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.4kUPexUg_nXd8FKcpFKVMPT5e269DCgeMtWZDbg1qiw')
      }
      if(timeOfDay === 'night' && data.weather[0].main === 'Clouds') {
        setBackgroundImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3be1dae-3caa-4d45-be6c-3de586ba95e2/dehq31u-e1508667-c715-41fc-b43f-2f2829e70ad5.jpg/v1/fill/w_1192,h_670,q_70,strp/rail_gate_by_bisbiswas_dehq31u-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2IzYmUxZGFlLTNjYWEtNGQ0NS1iZTZjLTNkZTU4NmJhOTVlMlwvZGVocTMxdS1lMTUwODY2Ny1jNzE1LTQxZmMtYjQzZi0yZjI4MjllNzBhZDUuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.FY7LtKKeDUXhWxY94HTVxCQsI7HNWLSGrfBffB3l-uE')
      }
      if(timeOfDay === 'night' && data.weather[0].main === 'Thunderstorm') {
        setBackgroundImage('/thunderstorm-1768742.jpg')
      }
      if(timeOfDay === 'night' && data.weather[0].main === 'Rain') {
        setBackgroundImage('/rain-4194.gif')
      }
      if(timeOfDay === 'night' && data.weather[0].main === 'Snow') {
        setBackgroundImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb506bfd-7fc9-4673-89a3-6b38d8e0a331/dandonb-51bbf3c0-296a-4a0d-81b0-a3c9acfcf8dd.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiNTA2YmZkLTdmYzktNDY3My04OWEzLTZiMzhkOGUwYTMzMVwvZGFuZG9uYi01MWJiZjNjMC0yOTZhLTRhMGQtODFiMC1hM2M5YWNmY2Y4ZGQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.iVfcphhUUGHiePW0VIZLaO84R0hC8jRKpJSmp-ObO7o')
      }
        //RETURN TIME
        return function cleanup() {
          clearInterval(timerId);
        };
      }
    
  }, [getData, weather, backgroundImage, timeOfDay]);

  //ADVICE FUNCTIONALITY
 async function handleClick() {
  const apiUrl = 'https://api.adviceslip.com/advice'
    try {
      const response = await fetch(apiUrl)
      let data = await response.json()
      setQuoteData(data)
      setTimeout(() => {
        setQuoteData(null)
      }, 3000);
  } catch (error) {
     console.log(error) 
  }
  }
//WEATHER MENU FUNCTIONALITY
  function handleOpen() {
    setOpen(!open)
  }
// IF TIME OF DAY EXISTS DISPLAY SCREEN, ELSE LOADING 
  return timeOfDay === '' ? (<Loader/>) : (
      <div id={timeOfDay} className='App'>
      <main style={{background:`url(${backgroundImage})`}} >
      
        {
          quoteData ? (
            <div className='quote-data'>
              <p>{quoteData.slip.advice}</p>
            </div>
          ) : <WeatherData weatherData={data} open={open} setOpen={setOpen}/>
        }
      
      <footer className='bottom-display'>
      <p className='time'>
      {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </p>
      <button onClick={handleClick} type='button'>Get advice</button>
      <button onClick={handleOpen} type='button'>{open ? 'Hide Weather' : 'Show Weather'}</button>
      <p className='weather'>
      {weather}F
      </p>
      </footer>
      </main>
    </div>
    )}
    

export default App
