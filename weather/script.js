const searchInput = document.querySelector("#searchInput")
searchButton = document.querySelector("#searchButton")
weatherIcon = document.querySelector("#weatherIcon")
windSpeed = document.querySelector("#windSpeed")
humidity = document.querySelector(".humidity")
weather = document.querySelector(".weather")
desc = document.querySelector(".desc")
API = "d445b43bdb3adf897392752880bab531";
// --------------------- Created By InCoder ---------------------
const setWeatherDetails = (data) => {
    // console.log(data);
    desc.innerHTML = data.weather[0].description;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    switch (data.weather[0].main) {
      case 'Clouds':
          weatherIcon.src = "C:/bharathintern/weather/Clouds.png";
          break;
      case 'Clear':
          weatherIcon.src = "C:/bharathintern/weather/sun.png";
          break;
      case 'Rain':
          weatherIcon.src = "C:/bharathintern/weather/rainy.png";
          break;
      case 'Mist':
          weatherIcon.src = "C:/bharathintern/weather/mist.png";
          break;
      case 'Snow':
          weatherIcon.src = "C:/bharathintern/weather/snow.png";
          break;
      case 'Haze':
          weatherIcon.src = "C:/bharathintern/weather/haze.png";
          break;
      default:
          weatherIcon.src = ""; // Provide a default image source if none of the cases match
  }
  
}

const callAPI = (id) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
                alert("Check spelling of City and try again or Something Went Wrong!");
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setWeatherDetails(data);
        })
        .catch(error => console.log(error))
}

searchButton.addEventListener("click", (e) => {
    if (searchInput.value == "") {
        alert("Please Enter City Name.");
    } else {
        callAPI(API);
    }
})

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
    }
})

searchButton.click();