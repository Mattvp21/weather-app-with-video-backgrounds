import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//1.Build the UI with a sample video
//2. Upon loading the page, the lat and long should be uploaded to the app
//3. Get the time with the abstract app
//3. Take the geolocation data, and match the lat long into the api call to get the current weather
//4. Create background video depending on the outdoor conditions