const apiKey = "a49d1da9f9f4516655bd00fd9a51fd21"; //grabs API key to allow access to API

const weatherDataElemet = document.getElementById("weather-data");//targets div with ID of weather-data

const cityInputElement = document.getElementById("cityInput");//targets input text field with ID of cityInput

const formEl = document.querySelector("form");//targets form

formEl.addEventListener("submit", (event)=>{
    event.preventDefault(); //stop refresh when clicking submit button
    const cityValue = cityInputElement.value; //stores value of input text field
    console.log(cityValue);
    getWeatherData(cityValue);//utilizing user input the function is called to search for data in API
});

async function getWeatherData(cityValue){
    try {
        //api address that is using user input sotred in "cityValue" to grab data from API. The API key is used to allow access to API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`) 

        if(!response.ok){
        throw new Error("Network resposne was not successful.")
        }
        const data = await response.json(); //parses the api data as json format
        
        console.log(data); 

        const temperature = Math.round(data.main.temp);//grabs the temperature data and rounds it

        const description = data.weather[0].description;//grabs description information from data

        const icon = data.weather[0].icon; //grabs icon data within data provided from API

        //array stores
        const details = [
            `Feels like: ${Math.round((data.main.temp * 9/5) + 32)}℉`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ]


        console.log(description);

        weatherDataElemet.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" srcset="">`
        weatherDataElemet.querySelector(".temperature").textContent = Math.round((`${temperature}` * 9/5)  + 32) + "℉";
        weatherDataElemet.querySelector(".description").textContent = description;

        //utilizing the details array  we are filling the innerHTML and genrating the 
        //bottom divs within the HTML doc.
        //we utilize the ".join("")" to indicate what seperates the divs such as commas, blank space, etc.
        weatherDataElemet.querySelector(".details").innerHTML = details.map((detail)=>
        `<div>${detail}</div>`).join("");
        
    } catch (error) {
        weatherDataElemet.querySelector(".icon").innerHTML = "";
        weatherDataElemet.querySelector(".temperature").textContent = "" ;
        weatherDataElemet.querySelector(".description").textContent = "An error happened, please try again later";

    
        weatherDataElemet.querySelector(".details").innerHTML = "";
    }
}

//1:25:00 https://www.youtube.com/watch?v=g6v_vbqKYeU