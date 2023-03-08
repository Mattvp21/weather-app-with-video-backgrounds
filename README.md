THE VITUAL WINDOW

https://master--incredible-banoffee-ee5978.netlify.app/

CREDITS:
Openweathermap api
Vite.js- Love this tool!
React
Netlify for hosting

The Goal:
Build an app for office workers who dont have windows in their offices to make a pretty view with weather updates and fortunes. Pictures are based on the weather and time of day. Make it so that the client can put in the url and have the weather data immediately available.

How that was acheived:
Javascripts navigator api allowed me to pull the lat and long coordinates and place them in the call to the weather api. I also created a state for the background image that checks against whether its day or night and the weather conditions.(I probably do not have every possible condition yet)
Time of day is determined by the weather api's sunrise and sunset(Credit to my wife for reminding me to automate this). If sunrise, state is day. If sunset, day turns to night, so on and so on. 

Challenges:
Real time weather updates- My plan only lets me call the API so much, it just wasn't feesible with the resources I have at my disposal.
Performance- My goal is to make this perform better. I called the weather API with a timeout function to ensure that the data arrives before it errors but I improve this.

